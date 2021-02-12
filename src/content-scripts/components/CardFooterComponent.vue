<template>
    <div class="flex-container">
        <div class="gitlab-info">
            <milestone-component v-bind:due_date="issueInfo.due_date">
            </milestone-component>
            <merge-request v-bind:mergesQua="issueInfo.mergesQua">
            </merge-request>
            <approve> </approve>
        </div>
        <div> 
            <md-button class="md-dense md-primary">more</md-button>
        </div>
    </div>
</template>

<script>
import * as gitlab from "../gitlab-service";
import 'vue-material/dist/vue-material.min.css'
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
            console.log(this.buttonMore);
        }
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
.flex-container {
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
</style>
