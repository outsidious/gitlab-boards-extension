var $ = require("jquery");

export function GitlabService(urlOrigin, projectName) {
    this.origin = urlOrigin;
    console.log(this.origin);
    this.projectName = projectName;
    this.projectId = projectName.replaceAll("/", "%2F"); //formated project name might be used as id
    this.apiURL = "/api/v4/projects/";

    this.getAllIssues = function() {
        var url =
            this.origin + this.apiURL + this.projectId + "/issues/?scope=all";
        $.get(url, function(data) {
            //console.log(data)
            data.toString;
        });
    };

    this.getRelatedMerges = function(issueId, callback) {
        var url =
            this.origin +
            this.apiURL +
            this.projectId +
            "/issues/" +
            issueId +
            "/related_merge_requests";
        $.get(url, function(data) {
            callback(data);
        });
    };

    this.getCurrentIssue = function(issueId, callback) {
        var url =
            this.origin +
            this.apiURL +
            this.projectId +
            "/issues/?iids[]=" +
            issueId;
        $.get(url, function(data) {
            callback(data[0]);
        });
    };

    this.getMergeApprovals = function(MergeId, callback) {
        var url =
            this.origin +
            this.apiURL +
            this.projectId +
            "/merge_requests/" +
            MergeId +
            "/approvals";
        $.get(url, function(data) {
            callback(data["approved_by"]);
        });
    };

    this.getChangesUrl = function(MergeId) {
        var url =
            this.origin +
            "/" +
            this.projectName +
            "/-/merge_requests/" +
            MergeId +
            "/diffs";
        return url;
    };
}
