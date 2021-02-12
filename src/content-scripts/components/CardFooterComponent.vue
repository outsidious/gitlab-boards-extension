<template>
    <div>
        <div v-if="buttonMore">
            <br/>
            <br/>
            show me
        </div>
        <div class="tail-flex-container">
            <div class="gitlab-info">
                <milestone-component v-bind:due_date="issueInfo.due_date">
                </milestone-component>
                <merge-request v-bind:mergesQua="issueInfo.mergesQua">
                </merge-request>
                <approve> </approve>
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
var pathName = window.location.pathname;
var projectName = pathName.slice(1, pathName.indexOf("/-/"));
//console.log(projectName);
var origin = window.location.origin;
var gitlabService = new gitlab.GitlabService(origin, projectName);

export default {
    data() {
        return {
            issueInfo: {
                due_date: "",
                mergesQua: "",
            },
            buttonMore: false,
        };
    },
    methods: {
        getMilestoneCallback(issueInfo) {
            var milestoneInfo = issueInfo["milestone"];
            var strDueDate = "-";
            if (milestoneInfo) {
                strDueDate = milestoneInfo["due_date"];
                //var dueDate = Date.parse(strDueDate);
                //console.log(dueDate);
            }
            this.issueInfo.due_date = strDueDate;
        },
        getMergeCallback(issueInfo) {
            var mergesQua = issueInfo["merge_requests_count"];
            this.issueInfo.mergesQua = mergesQua;
        },
        changeButtonMoreState() {
            this.buttonMore = !this.buttonMore;
        },
    },
    mounted() {
        var isuueId = this.$el.parentElement.parentElement.parentElement.getAttribute(
            "issue-id"
        );
        gitlabService.getCurrentIssue(isuueId, this.getMilestoneCallback);
        gitlabService.getCurrentIssue(isuueId, this.getMergeCallback);
    },
};
</script>

<style scoped>
.tail-flex-container {
    display: flex;
    align-content: flex-end;
    justify-content: space-between;
    margin-top: 10px;
}

.gitlab-info {
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-content: flex-end;
}

.md-buton {
    z-index: 10000;
}
</style>
