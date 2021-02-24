<template>
    <div class="hidden-part-container">
        <div class="help-text ">actions</div>
        <a :href="this.changesUrl"> Show changes </a>
        <a v-on:click.stop.prevent="runPipeline($event)"> Run pipeline </a>
        <a v-on:click="merge()"> Merge </a>
        <a v-on:click="apporove()"> Approve </a>
        <a v-on:click="markAsReady()"> Mark as ready </a>
    </div>
</template>

<script>
import "vue-material-design-icons/styles.css";
export default {
    props: ["changesUrl"],
    mounted() {},
    methods: {
        runPipeline: function(event) {
            console.log("runPipeline click!");
            //console.log(event);
            //console.log(event.cancelBubble);
            event.stopImmediatePropagation();
            //console.log(event.cancelBubble);
            this.$emit('signalRunPipeline');
        },
        merge() {
            //console.log("merge clicked()");  
            this.$emit('signalMerge');
        },
        approve() {
            console.log("approve clicked()");
        },
        markAsReady() {
            console.log("markAsReady clicked()");
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
</style>
