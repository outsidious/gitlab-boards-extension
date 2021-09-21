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
                v-on:signalMarkAsDraft="markAsDraft"
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
if (window.localStorage["qoollab_user_token"]) {
    userToken = window.localStorage["qoollab_user_token"];
}
const pathName = window.location.pathname;
const projectName = pathName.slice(1, pathName.indexOf("/-/"));
const origin = window.location.origin;

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
                    draft: false,
                    sourceBranch: "",
                },
            },
            userInfo: {
                id: -1,
            },
            updateTime: 60,
            buttonMore: false,
            timerId: null,
            updateTimerId: null,
            issueId: -1,
            issueTitleElement: null,
            issueLinkPreviewElement: null,
            backendUrl: "",
            gitlabService: null,
        };
    },
    beforeDestroy() {
        if (this.timerId) {
            clearInterval(this.timerId);
        }
        if (this.updateTimerId) {
            clearInterval(this.updateTimerId);
        }
    },
    methods: {
        /*
        runLastPipeline() {
            gitlabService.runPipeline(
                this.issueInfo.lastRelatedMerge.pipelineId
            );
        },*/
        setTitleStatus(str) {
            if (
                str === "draft" &&
                !this.issueTitleElement.innerHTML.includes("Draft: ")
            ) {
                this.issueTitleElement.innerHTML = `Draft: ${this.issueTitleElement.innerHTML}`;
            } else if (str === "ready") {
                this.issueTitleElement.innerHTML = this.issueTitleElement.innerHTML.replace(
                    "Draft: ",
                    ""
                );
            }
        },
        setPreviewerLink(str) {
            this.issueLinkPreviewElement.href = str;
            this.issueLinkPreviewElement.style.removeProperty("display");
            this.issueLinkPreviewElement.style =
                "pointer-events: auto; cursor: pointer";
        },
        mergeRequest() {
            this.gitlabService.mergeRequest(
                this.issueInfo.lastRelatedMerge.mergeId
            );
        },
        approveRequest() {
            if (this.issueInfo.lastRelatedMerge.mergeId != -1)
                this.gitlabService.approveMerge(
                    this.issueInfo.lastRelatedMerge.mergeId
                );
        },
        unapproveRequest() {
            if (this.issueInfo.lastRelatedMerge.mergeId != -1)
                this.gitlabService.unapproveMerge(
                    this.issueInfo.lastRelatedMerge.mergeId
                );
        },
        markAsReady() {
            if (this.issueInfo.lastRelatedMerge.mergeId != -1) {
                this.gitlabService.markAsReady(
                    this.issueInfo.lastRelatedMerge.mergeId,
                    this.issueInfo.lastRelatedMerge.mergeTitle
                );
            }
        },
        markAsDraft() {
            if (this.issueInfo.lastRelatedMerge.mergeId != -1) {
                this.gitlabService.markAsDraft(
                    this.issueInfo.lastRelatedMerge.mergeId,
                    this.issueInfo.lastRelatedMerge.mergeTitle
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
                strDueDate = `${dueDateArr[1]} ${dueDateArr[2]}`;
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
                mergesInfo.forEach((merge) => {
                    if (
                        new Date(merge["created_at"]) >
                        new Date(theLatest["created_at"])
                    )
                        theLatest = merge;
                });
                this.issueInfo.lastRelatedMerge = {
                    ...this.issueInfo.lastRelatedMerge,
                };
                this.issueInfo.lastRelatedMerge.mergeId = theLatest["iid"]; // lastRelated in var
                this.issueInfo.lastRelatedMerge.sourceBranch =
                    theLatest["source_branch"];
                this.issueInfo.lastRelatedMerge.mergeTitle =
                    theLatest["description"];
                this.issueInfo.lastRelatedMerge.mergeStatus =
                    theLatest["merge_status"];
                this.issueInfo.lastRelatedMerge.state = theLatest["state"];
                this.issueInfo.lastRelatedMerge.draft = theLatest[
                    "title"
                ].includes("Draft: ");
                if (this.issueInfo.lastRelatedMerge.draft)
                    this.setTitleStatus("draft");
                else this.setTitleStatus("ready");
                if (theLatest["has_conflicts"])
                    this.issueInfo.lastRelatedMerge.mergeConflicts =
                        theLatest["has_conflicts"];
                if (theLatest["head_pipeline"]) {
                    this.issueInfo.lastRelatedMerge.pipelineStatus =
                        theLatest["head_pipeline"].status;
                    this.issueInfo.lastRelatedMerge.pipelineId =
                        theLatest["head_pipeline"].id;
                }
                this.updateBackendUrl();
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
        changeButtonMoreState() {
            this.buttonMore = !this.buttonMore;
        },
        sendRequestsToGitlabService(issueId) {
            this.gitlabService.getCurrentIssue(issueId, this.getIssueCallback);
            this.gitlabService.getRelatedMerges(
                issueId,
                this.getRelatedMergesCallback
            );
            this.gitlabService.updateUserInfo(this.updateUserInfoCallback);
        },
        updateUpdateTime() {
            if (window.localStorage["qoollab_update_time"]) {
                return window.localStorage["qoollab_update_time"];
            }
            return this.updateTime;
        },
        updateBackendUrl() {
            const previewArr = JSON.parse(
                window.localStorage["qoollab_preview_arr"]
            );
            this.backendUrl = "";
            previewArr.forEach((elem) => {
                if (document.URL.includes(elem.boardsPageURL)) {
                    this.backendUrl = elem.backendURL;
                }
            });
            if (
                this.backendUrl != "" &&
                this.issueInfo.lastRelatedMerge.sourceBranch != ""
            ) {
                this.setPreviewerLink(
                    `${this.backendUrl}/${this.issueInfo.lastRelatedMerge.sourceBranch}`
                );
            }
        },
        createUpdateInterval() {
            this.sendRequestsToGitlabService(this.issueId);
            if (this.timerId) {
                clearInterval(this.timerId);
            }
            let time = this.updateTime + (Math.floor(Math.random() * 21) - 10);
            if (time <= 0) {
                time = Math.floor(Math.random() * 7) + 3;
            }
            this.timerId = setInterval(() => {
                this.sendRequestsToGitlabService(this.issueId);
            }, time * 1000);
        },
    },
    mounted() {
        this.gitlabService = new gitlab.GitlabService(
            origin,
            projectName,
            userToken,
            () => {
                this.sendRequestsToGitlabService(this.issueId);
            },
            (userId) => {
                this.userInfo.id = userId;
            }
        );
        const qoollabCard = this.$el.parentElement.parentElement;
        this.issueTitleElement = qoollabCard.querySelector(
            "div > div > div > h4 > a"
        );
        this.issueLinkPreviewElement = qoollabCard.querySelector(
            ".preview-link"
        );
        this.issueLinkPreviewElement.style.display = "none";
        this.issueId = qoollabCard.getAttribute("issue-id");
        this.createUpdateInterval();
        this.updateTimerId = setInterval(() => {
            this.updateBackendUrl();
            const newTime = Number(this.updateUpdateTime());
            if (newTime != this.updateTime) {
                this.updateTime = newTime;
                this.createUpdateInterval();
            }
        }, 30000);

        this.$on("signalMergeLoaded", function(merge) {
            this.gitlabService.getMergeApprovals(
                merge,
                this.getApprovalsCallback
            );
            this.issueInfo.lastRelatedMerge.changesUrl = this.gitlabService.getChangesUrl(
                merge
            );
        });

        const retry = qoollabCard.getElementsByClassName("retry-icon")[0];
        retry.addEventListener("mousedown", (event) => {
            event.stopImmediatePropagation();
            event.stopPropagation();
            retry.style.backgroundColor = "lavender";
            setTimeout(() => {
                retry.style.backgroundColor = "inherit";
                this.sendRequestsToGitlabService(this.issueId);
            }, 150);
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
    border-radius: 0.25rem;
}

.button-more:hover {
    background-color: rgba(41, 41, 97, 0.08);
}
</style>
