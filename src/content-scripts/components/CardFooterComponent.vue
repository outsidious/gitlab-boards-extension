<template>
    <div class="qoollo-card-footer">
        <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
        />
        <div v-if="buttonMore">
            <hidden-part
                v-bind:mergeInfo="issueInfo.lastRelatedMerge"
                v-on:signalRunPipeline="runLastPipeline"
                v-on:signalMerge="mergeRequest"
                v-on:signalApprove="approveRequest"
            >
            </hidden-part>
        </div>
        <div class="tail-flex-container">
            <div class="gitlab-info">
                <milestone-component v-bind:due_date="issueInfo.due_date">
                </milestone-component>
                <merge-request
                    v-bind:mergesQua="issueInfo.mergesQua"
                    v-bind:mergeStatus="
                        issueInfo.lastRelatedMerge.pipelineStatus
                    "
                >
                </merge-request>
                <approve
                    v-bind:approvalsQua="
                        issueInfo.lastRelatedMerge.mergeApprovals
                    "
                >
                </approve>
            </div>
            <div>
                <md-button
                    v-on:click="changeButtonMoreState()"
                    class="md-dense md-primary button-more"
                >
                    <div v-if="buttonMore">less</div>
                    <div v-else>more</div>
                </md-button>
            </div>
        </div>
    </div>
</template>

<script>
import * as gitlab from "../gitlab-service";
import "vue-material/dist/vue-material.min.css";

function restoreToken() {
    let token = localStorage["qoollab_user_token"];
    if (!token) {
        return "";
    }
    return token
}

let promt = prompt("What's your access token (required for some operations)?", restoreToken());
localStorage["qoollab_user_token"] = promt;
let userToken = localStorage["qoollab_user_token"];

let pathName = window.location.pathname;
let projectName = pathName.slice(1, pathName.indexOf("/-/"));
let origin = window.location.origin;
let gitlabService = new gitlab.GitlabService(origin, projectName, userToken); 

export default {
    data() {
        return {
            issueInfo: {
                due_date: "",
                mergesQua: "",
                lastRelatedMerge: {
                    mergeStatus: "",
                    state: "",
                    mergeId: -1,
                    mergeConflicts: false,
                    pipelineId: -1,
                    pipelineStatus: "undefined",
                    mergeApprovals: -1,
                    changesUrl: "",
                },
            },
            buttonMore: false,
        };
    },
    methods: {
        runLastPipeline() {
            if (this.issueInfo.lastRelatedMerge.pipelineId != -1) {
                gitlabService.runPipeline(
                    this.issueInfo.lastRelatedMerge.pipelineId
                );
            }
        },
        mergeRequest() {
            if (this.issueInfo.lastRelatedMerge.mergeId != -1) {
                gitlabService.mergeRequest(
                    this.issueInfo.lastRelatedMerge.mergeId
                );
            }
        },
        approveRequest() {
            if (this.issueInfo.lastRelatedMerge.mergeId != -1) {
                gitlabService.approveMerge(
                    this.issueInfo.lastRelatedMerge.mergeId
                );
            }
        },
        /*
        markAsReady() {
            if (this.issueInfo.lastRelatedMerge.mergeId != -1) {
                gitlabService.markAsReady(
                    this.issueInfo.lastRelatedMerge.mergeId,
                    function(data) {
                        console.log(data);
                    }
                );
            }
        },*/
        getMilestoneCallback(issueInfo) {
            let milestoneInfo = issueInfo["milestone"];
            let strDueDate = "-";
            if (milestoneInfo) {
                let dueDate = new Date(milestoneInfo.due_date).toString();
                let dueDateArr = dueDate.split(" ");
                strDueDate = dueDateArr[1] + " " + dueDateArr[2];
            }
            this.issueInfo.due_date = strDueDate;
        },
        getQuaMergesCallback(issueInfo) {
            let mergesQua = issueInfo["merge_requests_count"];
            this.issueInfo.mergesQua = mergesQua;
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
            this.issueInfo.lastRelatedMerge.mergeApprovals = approvers.length;
        },
        changeButtonMoreState() {
            this.buttonMore = !this.buttonMore;
        },
    },
    mounted() {
        //let qoollabCard = this.$el.parentElement.parentElement.parentElement;
        let qoollabCard = this.$el.parentElement.parentElement
        let issueId = qoollabCard.getAttribute("issue-id");
        gitlabService.getCurrentIssue(issueId, this.getMilestoneCallback);
        gitlabService.getCurrentIssue(issueId, this.getQuaMergesCallback);
        gitlabService.getRelatedMerges(issueId, this.getRelatedMergesCallback);

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
    top: 20px;
}

.tail-flex-container {
    display: flex;
    align-content: flex-end;
    justify-content: space-between;
    margin-top: 10px;
}

.gitlab-info {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-content: flex-end;
}

.button-more {
    width: 20%;
    position: relative;
    left: 1.5rem;
}
</style>
