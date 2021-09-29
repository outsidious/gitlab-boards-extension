<template>
    <div class="hidden-part-container">
        <a
            :href="this.issueInfo.lastRelatedMerge.changesUrl"
            v-bind:class="{
                disabled_link: this.issueInfo.lastRelatedMerge.mergeId === -1,
            }"
        >
            show changes
        </a>

        <actions
            v-on:signalApprove="approve"
            v-on:signalUnapprove="unapprove"
            v-on:signalMerge="merge"
            v-on:signalMarkAsReady="markAsReady"
            v-on:signalMarkAsDraft="markAsDraft"
            v-bind:issueInfo="issueInfo"
            v-bind:userInfo="userInfo"
            v-bind:mergeInfo="issueInfo.lastRelatedMerge"
        >
        </actions>
        <br />
        <details-comp
            v-bind:iconsUrl="iconsUrl"
            v-bind:milestoneInfo="issueInfo.milestoneInfo"
            v-bind:issueInfo="issueInfo"
        >
        </details-comp>

        <!---
        <a
            v-on:click.stop.prevent="runPipeline()"
            v-bind:class="{
                disabled: this.mergeInfo.pipelineId === -1,
            }"
        >
            Run pipeline
        </a>
        --->
    </div>
</template>

<script>
import "vue-material-design-icons/styles.css";
export default {
    props: ["issueInfo", "userInfo", "iconsUrl"],
    methods: {
        /*
        runPipeline() {
            event.stopImmediatePropagation();
            this.$emit("signalRunPipeline");
        },*/
        merge() {
            this.$emit("signalMerge");
        },
        approve() {
            this.$emit("signalApprove");
        },
        unapprove() {
            this.$emit("signalUnapprove");
        },
        markAsReady() {
            this.$emit("signalMarkAsReady");
        },
        markAsDraft() {
            this.$emit("signalMarkAsDraft");
        },
    },
};
</script>

<style scoped>
.hidden-part-container {
    display: flex;
    flex-direction: column;
    justify-content: left;
}

a {
    color: black;
    font-weight: 600;
}

.run-pipeline-but {
    width: 8rem;
    padding: 0;
}

.disabled_link {
    pointer-events: none;
    color: grey;
}
</style>
