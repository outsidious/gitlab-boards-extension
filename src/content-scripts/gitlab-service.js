let $ = require("jquery");

export class GitlabService {
    constructor(urlOrigin, projectName, userToken) {
        this.origin = urlOrigin;
        this.projectName = projectName;
        this.apiURL = "/api/v4/projects/";
        this.userToken = "";
        this.userId = -1;
        if (userToken) this.userToken = userToken;
        this.projectId = projectName.replaceAll("/", "%2F"); //formated project name might be used as project id
    }

    get projectApiUrl() {
        return this.origin + this.apiURL + this.projectId;
    }

    get tokenHeader() {
        return {
            "PRIVATE-TOKEN": this.userToken,
        };
    }

    updateUserInfo(callback) {
        const newToken = window.localStorage["qoollab_user_token"];
        if (newToken) {
            this.userToken = newToken;
            this.getUserId(callback);
        }
    }

    getUserId(callback) {
        const url = this.origin + "/api/v4/" + "personal_access_tokens";
        const headers = this.tokenHeader;
        $.ajax({
            url,
            headers,
            method: "GET",
            success: function(data) {
                if (data.length >= 1) {
                    this.userId = data[0]["user_id"];
                } else {
                    this.userId = -1;
                }
                callback(this.userId);
            },
            error: function() {
                this.userId = -1;
                callback(-1);
            },
        });
    }

    getRelatedMerges(issueId, callback) {
        const url =
            this.projectApiUrl +
            "/issues/" +
            issueId +
            "/related_merge_requests";
        $.get(url, function(data) {
            callback(data);
        });
    }

    getCurrentIssue(issueId, callback) {
        const url = this.projectApiUrl + "/issues/?iids[]=" + issueId;
        $.get(url, function(data) {
            callback(data[0]);
        });
    }

    getMergeApprovals(MergeId, callback) {
        const url =
            this.projectApiUrl + "/merge_requests/" + MergeId + "/approvals";
        if (MergeId > 0) {
            $.get(url, function(data) {
                callback(data["approved_by"]);
            });
        } else {
            callback([]);
        }
    }

    getChangesUrl(MergeId) {
        const url =
            this.origin +
            "/" +
            this.projectName +
            "/-/merge_requests/" +
            MergeId +
            "/diffs";
        return url;
    }

    runPipeline(pipelineId) {
        if (this.userToken) {
            const url =
                this.projectApiUrl + "/pipelines/" + pipelineId + "/retry";
            const headers = this.tokenHeader;
            $.ajax({
                url,
                headers,
                method: "POST",
                success: function() {
                    return true;
                },
            });
        }
    }

    mergeRequest(mergeId) {
        if (this.userToken) {
            const url =
                this.projectApiUrl + "/merge_requests/" + mergeId + "/merge";
            const headers = this.tokenHeader;
            $.ajax({
                url,
                headers,
                method: "PUT",
                success: function() {
                    return true;
                },
            });
        }
    }

    approveMerge(mergeId) {
        if (this.userToken) {
            const url =
                this.projectApiUrl + "/merge_requests/" + mergeId + "/approve";
            const headers = this.tokenHeader;
            $.ajax({
                url,
                headers,
                method: "POST",
                success: function() {
                    return true;
                },
            });
        }
    }

    unapproveMerge(mergeId) {
        if (this.userToken) {
            const url =
                this.projectApiUrl +
                "/merge_requests/" +
                mergeId +
                "/unapprove";
            const headers = this.tokenHeader;
            $.ajax({
                url,
                headers,
                method: "POST",
                success: function() {
                    return true;
                },
            });
        }
    }

    markAsReady(mergeId, mergeTitle, callback) {
        if (this.userToken) {
            mergeTitle = mergeTitle.replace("Draft: ", "");
            const url =
                this.projectApiUrl +
                "/merge_requests/" +
                mergeId +
                "?title=" +
                mergeTitle;
            const headers = this.tokenHeader;
            $.ajax({
                url,
                headers,
                method: "PUT",
                success: function() {
                    callback();
                },
            });
        }
    }

    markAsDraft(mergeId, mergeTitle, callback) {
        if (this.userToken) {
            const url =
                this.projectApiUrl +
                "/merge_requests/" +
                mergeId +
                "?title=Draft: " +
                mergeTitle;
            const headers = this.tokenHeader;
            $.ajax({
                url,
                headers,
                method: "PUT",
                success: function() {
                    callback();
                },
            });
        }
    }
}
