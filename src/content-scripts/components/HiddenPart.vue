<template>
    <div class="hidden-part-container">
        <a
            :href="this.mergeInfo.changesUrl"
            v-bind:class="{
                disabled_link: this.mergeInfo.mergeId === -1,
            }"
        >
            show changes
        </a>

        <actions
            v-on:signalApprove="approve"
            v-on:signalMerge="merge"
            v-on:signalMarkAsReady="markAsReady"
            v-bind:mergeInfo="mergeInfo"
        >
        </actions>

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
    props: ["mergeInfo"],
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
        markAsReady() {
            this.$emit("signalMarkAsReady");
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
