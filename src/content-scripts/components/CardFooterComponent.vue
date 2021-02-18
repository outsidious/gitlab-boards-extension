<template>
    <div class="qoollo-card-footer">
        <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
        />
        <div v-if="buttonMore">
            <br />
            <br />
            <hidden-part
                v-bind:changesUrl="issueInfo.lastRelatedMerge.changesUrl"
            >
            </hidden-part>
            <br />
            <br />
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
                    class="md-dense md-primary"
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
import HiddenPart from "./HiddenPart.vue";
var pathName = window.location.pathname;
var projectName = pathName.slice(1, pathName.indexOf("/-/"));
//console.log(projectName);
var origin = window.location.origin;
var gitlabService = new gitlab.GitlabService(origin, projectName);

export default {
    components: { HiddenPart },
    data() {
        return {
            issueInfo: {
                due_date: "",
                mergesQua: "",
                lastRelatedMerge: {
                    mergeId: 0,
                    mergeConflicts: false,
                    pipelineStatus: "undefined",
                    mergeApprovals: 0,
                    changesUrl: "",
                },
            },
            buttonMore: false,
        };
    },
    methods: {
        getMilestoneCallback(issueInfo) {
            var milestoneInfo = issueInfo["milestone"];
            var strDueDate = "-";
            if (milestoneInfo) {
                var dueDate = Date(milestoneInfo["due_date"]).toString();
                var dueDateArr = dueDate.split(" ");
                strDueDate = dueDateArr[1] + " " + dueDateArr[2];
                //var dueDate = Date.parse(strDueDate);
                //console.log(dueDate);
            }
            this.issueInfo.due_date = strDueDate;
        },
        getQuaMergesCallback(issueInfo) {
            var mergesQua = issueInfo["merge_requests_count"];
            this.issueInfo.mergesQua = mergesQua;
        },
        getRelatedMergesCallback(mergesInfo) {
            if (mergesInfo.length != 0) {
                var theLatest = mergesInfo[0];
                for (var i = 0; i < mergesInfo.length; ++i) {
                    if (
                        Date(mergesInfo[i]["created_at"]) >
                        Date(theLatest["created_at"])
                    )
                        theLatest = mergesInfo[i];
                }
                this.issueInfo.lastRelatedMerge.mergeId = theLatest["iid"];
                if (theLatest["has_conflicts"])
                    this.issueInfo.lastRelatedMerge.mergeConflicts =
                        theLatest["has_conflicts"];
                if (theLatest["head_pipeline"])
                    this.issueInfo.lastRelatedMerge.pipelineStatus =
                        theLatest["head_pipeline"].status;
            }
            this.$emit("merge_loaded", this.issueInfo.lastRelatedMerge.mergeId);
            //console.log(this.issueInfo.lastRelatedMerge.mergeId);
            //console.log(this.issueInfo.lastRelatedMerge.mergeConflicts);
            //console.log(this.issueInfo.lastRelatedMerge.pipelineStatus);
        },
        getApprovalsCallback(approvers) {
            //console.log(approvers);
            this.issueInfo.lastRelatedMerge.mergeApprovals = approvers.length;
        },
        changeButtonMoreState() {
            this.buttonMore = !this.buttonMore;
        },
    },
    mounted() {
        var issueId = this.$el.parentElement.parentElement.parentElement.getAttribute(
            "issue-id"
        );
        gitlabService.getCurrentIssue(issueId, this.getMilestoneCallback);
        gitlabService.getCurrentIssue(issueId, this.getQuaMergesCallback);
        gitlabService.getRelatedMerges(issueId, this.getRelatedMergesCallback);
        this.$on("merge_loaded", function(merge) {
            gitlabService.getMergeApprovals(merge, this.getApprovalsCallback);
            this.issueInfo.lastRelatedMerge.changesUrl = gitlabService.getChangesUrl(merge);
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
    width: 65%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-content: flex-end;
}

.md-buton {
    z-index: 10000;
}
</style>
