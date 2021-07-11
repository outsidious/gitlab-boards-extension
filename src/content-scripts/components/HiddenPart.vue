<template>
    <div class="hidden-part-container">
        <div class="help-text">actions</div>
        <a
            :href="this.mergeInfo.changesUrl"
            v-bind:class="{
                disabled_link: this.mergeInfo.mergeId === -1,
            }"
        >
            Show changes
        </a>

        <md-button
            v-on:click="merge()"
            @focusin.stop
            @mousedown.stop
            style="text-transform: capitalize;"
            class="merge-button action-button"
            v-bind="{
                disabled:
                    this.mergeInfo.mergeId === -1 ||
                    this.mergeInfo.mergeStatus != 'can_be_merged' ||
                    this.mergeInfo.state != 'opened' ||
                    this.mergeInfo.has_conflicts,
            }"
            >Merge</md-button
        >

        <md-button
            v-on:click="approve()"
            @focusin.stop
            @mousedown.stop
            style="text-transform: capitalize;"
            class="approve-button action-button"
            v-bind="{
                disabled: this.mergeInfo.mergeId === -1,
            }"
            >Approve</md-button
        >

        <!---
        <a
            v-on:click.stop.prevent="runPipeline()"
            v-bind:class="{
                disabled: this.mergeInfo.pipelineId === -1,
            }"
        >
            Run pipeline
        </a>
        <a
            v-on:click="approve()"
            v-bind:class="{
                disabled: this.mergeInfo.mergeId === -1,
            }"
        >
            Approve
        </a>
        <a v-on:click="markAsReady()"> Mark as ready </a>
        --->
    </div>
</template>

<script>
import "vue-material-design-icons/styles.css";
export default {
    props: ["mergeInfo"],
    methods: {
        runPipeline() {
            //event.stopImmediatePropagation();
            this.$emit("signalRunPipeline");
        },
        merge() {
            console.log("merge clicked");
            //this.$emit("signalMerge");
        },
        approve() {
            console.log("approve clicked");
            //this.$emit("signalApprove");
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

.help-text {
    font-size: 0.7rem;
    color: grey;
    opacity: 0.7;
}

.disabled_link {
    pointer-events: none;
    color: grey;
}

.action-button {
    border-radius: 5px;
    width: 60px;
}

.merge-button {
    background-color: #108548;
    color: #FFFFFF;
}

.merge-button:disabled {
    background-color: rgb(24, 192, 105);
}

.approve-button {
    background-color:#1F75CB;
    color: #FFFFFF;
}

.approve-button:disabled {
    background-color:#58a8f8;
}
</style>
