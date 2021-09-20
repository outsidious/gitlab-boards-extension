const $ = require("jquery");

class AjaxParams {
    constructor(url, headers = {}, method = "GET") {
        this.url = url;
        this.headers = headers;
        this.method = method;
        this.complete = () => {};
        this.success = () => {};
    }
}

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
        this.userId = -1;
        const params = new AjaxParams(url, this.tokenHeader, "GET");
        params.success = (data) => {
            if (data.length) {
                this.userId = data[0]["user_id"];
            }
        };
        params.complete = () => {
            callback(this.userId);
        };
        $.ajax(params);
    }

    getRelatedMerges(issueId, callback) {
        const url =
            this.projectApiUrl +
            "/issues/" +
            issueId +
            "/related_merge_requests";
        $.get(url, (data) => {
            callback(data);
        });
    }

    getCurrentIssue(issueId, callback) {
        const url = this.projectApiUrl + "/issues/?iids[]=" + issueId;
        $.get(url, (data) => {
            if (data.length) callback(data[0]);
        });
    }

    getMergeApprovals(mergeId, callback) {
        const url =
            this.projectApiUrl + "/merge_requests/" + mergeId + "/approvals";
        let approvers = [];
        if (mergeId > 0) {
            const params = new AjaxParams(url, "GET");
            params.success = (data) => {
                approvers = data["approved_by"];
            };
            params.complete = () => {
                callback(approvers);
            };
            $.ajax(params);
        }
    }

    getChangesUrl(MergeId) {
        return (
            this.origin +
            "/" +
            this.projectName +
            "/-/merge_requests/" +
            MergeId +
            "/diffs"
        );
    }

    runPipeline(pipelineId) {
        if (this.userToken) {
            const url =
                this.projectApiUrl + "/pipelines/" + pipelineId + "/retry";
            const params = new AjaxParams(url, this.tokenHeader, "POST");
            $.ajax(params);
        }
    }

    mergeRequest(mergeId) {
        if (this.userToken) {
            const url =
                this.projectApiUrl + "/merge_requests/" + mergeId + "/merge";
            const params = new AjaxParams(url, this.tokenHeader, "PUT");
            $.ajax(params);
        }
    }

    approveMerge(mergeId) {
        if (this.userToken) {
            const url =
                this.projectApiUrl + "/merge_requests/" + mergeId + "/approve";
            const params = new AjaxParams(url, this.tokenHeader, "POST");
            $.ajax(params);
        }
    }

    unapproveMerge(mergeId) {
        if (this.userToken) {
            const url =
                this.projectApiUrl +
                "/merge_requests/" +
                mergeId +
                "/unapprove";
            const params = new AjaxParams(url, this.tokenHeader, "POST");
            $.ajax(params);
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
            const params = new AjaxParams(url, this.tokenHeader, "PUT");
            params.success = () => {
                callback();
            };
            $.ajax(params);
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
            const params = new AjaxParams(url, this.tokenHeader, "PUT");
            params.success = () => {
                callback();
            };
            $.ajax(params);
        }
    }
}
