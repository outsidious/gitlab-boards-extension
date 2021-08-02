let $ = require("jquery");

export function GitlabService(urlOrigin, projectName, userToken) {
    this.origin = urlOrigin;
    this.projectName = projectName;
    this.userToken = "";
    this.userId = -1;
    if (userToken) this.userToken = userToken;
    this.projectId = projectName.replaceAll("/", "%2F"); //formated project name might be used as project id
    this.apiURL = "/api/v4/projects/";

    this.updateUserToken = function() {
        const newToken = window.localStorage["qoollab_user_token"];
        if (newToken && newToken != "") {
            this.userToken = newToken;
        }
    };

    this.updateUserId = function() {
        let url =
                this.origin +
                "/api/v4/" +
                "personal_access_tokens"
            $.ajax({
                url: url,
                headers: {
                    "PRIVATE-TOKEN": this.userToken,
                },
                method: "GET",
                success: function(data) {
                    if (data.length >= 1) {
                        this.userId = data[0]["user_id"]
                    }
                    return true;
                },
            });
    };

    this.updateUserInfo = function() {
        this.updateUserToken();
        if (this.userToken && this.userToken != "") {
            this.updateUserId();
        }
    }

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
        this.updateUserInfo();
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

    this.markAsReady = function(mergeId, callback) {
        this.updateUserToken();
        if (this.userToken) {
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
    };
}
