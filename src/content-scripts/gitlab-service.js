let $ = require("jquery");

export function GitlabService(urlOrigin, projectName, userToken = "") {
    this.origin = urlOrigin;
    this.projectName = projectName;
    this.userToken = "";
    if (userToken) this.userToken = userToken;
    this.projectId = projectName.replaceAll("/", "%2F"); //formated project name might be used as project id
    this.apiURL = "/api/v4/projects/";

    this.getRelatedMerges = function(issueId, callback) {
        let url =
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
        let url =
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
        let url =
            this.origin +
            this.apiURL +
            this.projectId +
            "/merge_requests/" +
            MergeId +
            "/approvals";
        if (MergeId > 0) {
            $.get(url, function(data) {
                callback(data["approved_by"]);
            });
        } else {
            callback([]);
        }
    };

    this.getChangesUrl = function(MergeId) {
        let url =
            this.origin +
            "/" +
            this.projectName +
            "/-/merge_requests/" +
            MergeId +
            "/diffs";
        return url;
    };

    this.runPipeline = function(pipelineId) {
        if (this.userToken != "") {
            let url =
                this.origin +
                this.apiURL +
                this.projectId +
                "/pipelines/" +
                pipelineId +
                "/retry";
            $.ajax({
                url: url,
                headers: {
                    "PRIVATE-TOKEN": this.userToken,
                },
                method: "POST",
                success: function() {
                    return true;
                },
            });
        }
    };

    this.mergeRequest = function(mergeId) {
        if (this.userToken != "") {
            let url =
                this.origin +
                this.apiURL +
                this.projectId +
                "/merge_requests/" +
                mergeId +
                "/merge";
            $.ajax({
                url: url,
                headers: {
                    "PRIVATE-TOKEN": this.userToken,
                },
                method: "PUT",
                success: function() {
                    return true;
                },
            });
        }
    };

    this.approveMerge = function(mergeId) {
        if (this.userToken != "") {
            let url =
                this.origin +
                this.apiURL +
                this.projectId +
                "/merge_requests/" +
                mergeId +
                "/approve";
            $.ajax({
                url: url,
                headers: {
                    "PRIVATE-TOKEN": this.userToken,
                },
                method: "POST",
                success: function() {
                    return true;
                },
            });
        }
    };

    /*this.markAsReady = function(mergeId, callback) {
        if (this.userToken != "") {
            let url =
                this.origin +
                "/" +
                this.projectName +
                "/-/merge_requests/" +
                mergeId +
                "?merge_request%5Bwip_event%5D=wip&format=json";
            console.log(url);
            $.ajax({
                url: url,
                headers: {
                    "PRIVATE-TOKEN": this.userToken,
                },
                method: "PUT",
                success: function(data) {
                    callback(data);
                },
            });
        }
    };*/
}
