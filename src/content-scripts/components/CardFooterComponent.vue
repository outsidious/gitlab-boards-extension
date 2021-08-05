<template>
    <div class="qoollo-card-footer">
        <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
        />
        <div v-if="buttonMore">
            <hidden-part
                v-bind:issueInfo="issueInfo"
                v-bind:userInfo="userInfo"
                v-on:signalMarkAsReady="markAsReady"
                v-on:signalMerge="mergeRequest"
                v-on:signalApprove="approveRequest"
                v-on:signalUnapprove="unapproveRequest"
            >
            </hidden-part>
        </div>
        <div class="tail-flex-container">
            <div class="gitlab-info">
                <milestone-component
                    v-bind:due_date="issueInfo.milestoneInfo.due_date"
                >
                </milestone-component>
                <merge-request
                    v-bind:mergesQua="issueInfo.mergesQua"
                    v-bind:mergeStatus="
                        issueInfo.lastRelatedMerge.pipelineStatus
                    "
                >
                </merge-request>
                <approve
                    v-bind:approvers="issueInfo.lastRelatedMerge.approvers"
                >
                </approve>
                <div
                    class="button-more"
                    @click.stop="changeButtonMoreState()"
                    @focusin.stop
                    @focusout.stop
                    @mousedown.stop
                >
                    <button-more v-bind:buttonMoreState="buttonMore">
                    </button-more>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as gitlab from "../gitlab-service";
import "vue-material/dist/vue-material.min.css";

let userToken = "";
if (!window.localStorage["qoollab_user_token"]) {
    let promt = prompt(
        "What's your access token (required for some operations)?"
    );
    window.localStorage["qoollab_user_token"] = promt;
    userToken = window.localStorage["qoollab_user_token"];
}

let pathName = window.location.pathname;
let projectName = pathName.slice(1, pathName.indexOf("/-/"));
let origin = window.location.origin;
let gitlabService = new gitlab.GitlabService(origin, projectName, userToken);

export default {
    data() {
        return {
            issueInfo: {
                milestoneInfo: {
                    milestoneTitle: "",
                    web_url: "",
                    due_date: "-",
                },
                mergesQua: "-",
                lastRelatedMerge: {
                    mergeStatus: "",
                    mergeTitle: "",
                    state: "",
                    mergeId: -1,
                    mergeConflicts: false,
                    pipelineId: -1,
                    pipelineStatus: "undefined",
                    approvers: [],
                    changesUrl: "",
                },
            },
            userInfo: {
                id: -1,
            },
            buttonMore: false,
            timerId: null,
            issueId: -1,
        };
    },
    beforeDestroy() {
        if (this.timerId) {
            clearInterval(this.timerId);
        }
    },
    methods: {
        /*
        runLastPipeline() {
            gitlabService.runPipeline(
                this.issueInfo.lastRelatedMerge.pipelineId
            );
        },*/
        mergeRequest() {
            gitlabService.updateUserInfo(this.updateUserInfoCallback);
            gitlabService.mergeRequest(this.issueInfo.lastRelatedMerge.mergeId);
            this.sendRequestsToGitlabService(this.issueId);
        },
        approveRequest() {
            gitlabService.updateUserInfo(this.updateUserInfoCallback);
            if (this.issueInfo.lastRelatedMerge.mergeId != -1)
                gitlabService.approveMerge(
                    this.issueInfo.lastRelatedMerge.mergeId
                );
            this.sendRequestsToGitlabService(this.issueId);
        },
        unapproveRequest() {
            gitlabService.updateUserInfo(this.updateUserInfoCallback);
            if (this.issueInfo.lastRelatedMerge.mergeId != -1)
                gitlabService.unapproveMerge(
                    this.issueInfo.lastRelatedMerge.mergeId
                );
            this.sendRequestsToGitlabService(this.issueId);
        },
        markAsReady() {
            console.log("mark as ready catch!");
            if (this.issueInfo.lastRelatedMerge.mergeId != -1) {
                gitlabService.markAsReady(
                    this.issueInfo.lastRelatedMerge.mergeId,
                    function(data) {
                        console.log(data);
                    }
                );
            }
        },
        getMilestoneCallback(issueInfo) {
            const milestoneInfo = issueInfo["milestone"];
            let strDueDate = "-";
            let strTitle = "-";
            if (milestoneInfo) {
                const dueDate = new Date(milestoneInfo.due_date).toString();
                const dueDateArr = dueDate.split(" ");
                strDueDate = dueDateArr[1] + " " + dueDateArr[2];
                strTitle = milestoneInfo.title;
                this.issueInfo.milestoneInfo.web_url = milestoneInfo.web_url;
            }
            this.issueInfo.milestoneInfo.due_date = strDueDate;
            this.issueInfo.milestoneInfo.milestoneTitle = strTitle;
        },
        getQuaMergesCallback(issueInfo) {
            this.issueInfo.mergesQua = issueInfo["merge_requests_count"];
        },
        getRelatedMergesCallback(mergesInfo) {
            if (mergesInfo.length != 0) {
                let theLatest = mergesInfo[0];
                for (let i = 1; i < mergesInfo.length; ++i) {
                    if (
                        new Date(mergesInfo[i]["created_at"]) >
                        new Date(theLatest["created_at"])
                    )
                        theLatest = mergesInfo[i];
                }
                this.issueInfo.lastRelatedMerge.mergeId = theLatest["iid"];
                this.issueInfo.lastRelatedMerge.mergeTitle =
                    theLatest["description"];
                this.issueInfo.lastRelatedMerge.mergeStatus =
                    theLatest["merge_status"];
                this.issueInfo.lastRelatedMerge.state = theLatest["state"];
                if (theLatest["has_conflicts"])
                    this.issueInfo.lastRelatedMerge.mergeConflicts =
                        theLatest["has_conflicts"];
                if (theLatest["head_pipeline"]) {
                    this.issueInfo.lastRelatedMerge.pipelineStatus =
                        theLatest["head_pipeline"].status;
                    this.issueInfo.lastRelatedMerge.pipelineId =
                        theLatest["head_pipeline"].id;
                }
            }
            this.$emit(
                "signalMergeLoaded",
                this.issueInfo.lastRelatedMerge.mergeId
            );
        },
        getApprovalsCallback(approvers) {
            this.issueInfo.lastRelatedMerge.approvers = approvers;
        },
        getIssueCallback(issueInfo) {
            this.getMilestoneCallback(issueInfo);
            this.getQuaMergesCallback(issueInfo);
        },
        updateUserInfoCallback(userId) {
            this.userInfo.id = userId;
        },
        changeButtonMoreState() {
            this.buttonMore = !this.buttonMore;
        },
        sendRequestsToGitlabService(issueId) {
            gitlabService.getCurrentIssue(issueId, this.getIssueCallback);
            gitlabService.getRelatedMerges(
                issueId,
                this.getRelatedMergesCallback
            );
            gitlabService.updateUserInfo(this.updateUserInfoCallback);
        },
    },
    mounted() {
        //let qoollabCard = this.$el.parentElement.parentElement.parentElement;
        let qoollabCard = this.$el.parentElement.parentElement;
        this.issueId = qoollabCard.getAttribute("issue-id");
        this.sendRequestsToGitlabService(this.issueId);
        this.timerId = setInterval(() => {
            this.sendRequestsToGitlabService(this.issueId);
        }, 10000);

        this.$on("signalMergeLoaded", function(merge) {
            gitlabService.getMergeApprovals(merge, this.getApprovalsCallback);
            this.issueInfo.lastRelatedMerge.changesUrl = gitlabService.getChangesUrl(
                merge
            );
        });
    },
};
</script>

<style scoped>
.qoollo-card-footer {
    position: relative;
    top: 10px;
}

.tail-flex-container {
    display: flex;
    align-content: flex-end;
    justify-content: space-between;
    margin-top: 10px;
}

.gitlab-info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-content: flex-end;
}

.button-more {
    display: flex;
    cursor: pointer;
    height: 1.5rem;
    width: 5rem;
    justify-content: center;
    align-items: center;
    position: relative;
    left: 1rem;
}

.button-more:hover {
    background-color: lavender;
}
</style>
