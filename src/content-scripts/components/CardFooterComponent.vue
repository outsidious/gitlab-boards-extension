<template>
    <div class="flex-container">
        <milestone-component v-bind:due_date="issueInfo.due_date">
        </milestone-component>
        <merge-request> </merge-request>
        <approve> </approve>
    </div>
</template>

<script>
import * as gitlab from "../gitlab-service";
var pathName = window.location.pathname;
var projectName = pathName.slice(1, pathName.indexOf("/-/"));
console.log(projectName);
var origin = window.location.origin;
var gitlabService = new gitlab.GitlabService(origin, projectName);

export default {
    data() {
        return {
            issueInfo: {
                due_date: "",
                other: "",
            },
        };
    },
    methods: {
        getMilestoneCallback(issueInfo) {
            console.log(issueInfo);
            var milestoneInfo = issueInfo["milestone"];
            var dueDate = "null";
            if (milestoneInfo) dueDate = milestoneInfo["due_date"];
            this.issueInfo.due_date = dueDate;
        },
    },
    mounted() {
        gitlabService.getCurrentIssue(1, this.getMilestoneCallback);
    },
};
</script>

<style scoped>
.flex-container {
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-content: flex-end;
    margin-top: 10px;
}
</style>
