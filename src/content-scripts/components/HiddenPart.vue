<template>
    <div class="hidden-part-container">
        <div class="help-text">actions</div>
        <a :href="this.mergeInfo.changesUrl"> Show changes </a>
        <a v-on:click.stop.prevent="runPipeline()"> Run pipeline </a>
        <!---stopPropagation doesn't work-->
        <a
            v-on:click="merge()"
            v-bind:class="{
                disabled:
                    this.mergeInfo.mergeStatus != 'can_be_merged' ||
                    this.mergeInfo.state != 'opened' ||
                    this.mergeInfo.has_conflicts,
            }"
        >
            Merge
        </a>
        <a v-on:click="approve()"> Approve </a>
        <!---<a v-on:click="markAsReady()"> Mark as ready </a>-->
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

.help-text {
    font-size: 0.7rem;
    color: grey;
    opacity: 0.7;
}

.disabled {
    pointer-events: none;
    color: grey;
}
</style>
