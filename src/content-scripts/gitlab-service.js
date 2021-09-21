const $ = require("jquery");

class AjaxParams {
    constructor(url, headers = {}, method = "GET", callback = () => {}) {
        this.url = url;
        this.headers = headers;
        this.method = method;
        this.complete = () => {};
        this.success = () => {
            callback();
        };
    }
}

export class GitlabService {
    constructor(urlOrigin, projectName, userToken, update, updateUserCallback) {
        this.origin = urlOrigin;
        this.projectName = projectName;
        this.apiURL = "/api/v4/projects/";
        this.userToken = "";
        if (userToken) this.userToken = userToken;
        this.updateInfo = update;
        this.updateUserCallback = updateUserCallback;
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

    updateUserInfo() {
        const newToken = window.localStorage["qoollab_user_token"];
        if (newToken) {
            this.userToken = newToken;
            const url = this.origin + "/api/v4/personal_access_tokens";
            let userId = -1;
            const params = new AjaxParams(url, this.tokenHeader, "GET");
            params.success = (data) => {
                if (data.length) {
                    userId = data[0]["user_id"];
                }
            };
            params.complete = () => {
                this.updateUserCallback(userId);
            };
            $.ajax(params);
        }
    }

    getRelatedMerges(issueId, callback) {
        const url =
            this.projectApiUrl + `/issues/${issueId}/related_merge_requests`;
        $.get(url, (data) => {
            callback(data);
        });
    }

    getCurrentIssue(issueId, callback) {
        const url = this.projectApiUrl + `/issues/?iids[]=${issueId}`;
        $.get(url, (data) => {
            if (data.length) callback(data[0]);
        });
    }

    getMergeApprovals(mergeId, callback) {
        const url = `${this.projectApiUrl}/merge_requests/${mergeId}/approvals`;
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

    getChangesUrl(mergeId) {
        return `${this.origin}/${this.projectName}/-/merge_requests/${mergeId}/diffs`;
    }

    runPipeline(pipelineId) {
        this.updateUserInfo();
        if (this.userToken) {
            const url = `${this.projectApiUrl}/pipelines/${pipelineId}/retry`;
            const params = new AjaxParams(
                url,
                this.tokenHeader,
                "POST",
                this.updateInfo
            );
            $.ajax(params);
        }
    }

    mergeRequest(mergeId) {
        this.updateUserInfo();
        if (this.userToken) {
            const url = `${this.projectApiUrl}/merge_requests/${mergeId}/merge`;
            const params = new AjaxParams(
                url,
                this.tokenHeader,
                "PUT",
                this.updateInfo
            );
            $.ajax(params);
        }
    }

    approveMerge(mergeId) {
        this.updateUserInfo();
        if (this.userToken) {
            const url = `${this.projectApiUrl}/merge_requests/${mergeId}/approve`;
            const params = new AjaxParams(
                url,
                this.tokenHeader,
                "POST",
                this.updateInfo
            );
            $.ajax(params);
        }
    }

    unapproveMerge(mergeId) {
        this.updateUserInfo();
        if (this.userToken) {
            const url = `${this.projectApiUrl}/merge_requests/${mergeId}/unapprove`;
            const params = new AjaxParams(
                url,
                this.tokenHeader,
                "POST",
                this.updateInfo
            );
            $.ajax(params);
        }
    }

    markAsReady(mergeId, mergeTitle) {
        this.updateUserInfo();
        if (this.userToken) {
            mergeTitle = mergeTitle.replace("Draft: ", "");
            const url = `${this.projectApiUrl}/merge_requests/${mergeId}?title=${mergeTitle}`;
            const params = new AjaxParams(
                url,
                this.tokenHeader,
                "PUT",
                this.updateInfo
            );
            $.ajax(params);
        }
    }

    markAsDraft(mergeId, mergeTitle) {
        this.updateUserInfo();
        if (this.userToken) {
            const url = `${this.projectApiUrl}/merge_requests/${mergeId}?title=Draft: ${mergeTitle}`;
            const params = new AjaxParams(
                url,
                this.tokenHeader,
                "PUT",
                this.updateInfo
            );
            $.ajax(params);
        }
    }
}
