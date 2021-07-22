<template>
    <div class="component-container">
        <div class="help-text">actions</div>
        <div class="buttons-container">
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

            <md-button
                v-on:click="markAsReady()"
                @focusin.stop
                @mousedown.stop
                style="text-transform: capitalize;"
                class="mark-as-ready-button action-button"
                >Mark as ready</md-button
            >
        </div>
    </div>
</template>

<script>
import "vue-material-design-icons/styles.css";
export default {
    props: ["mergeInfo"],
    methods: {
        merge() {
            console.log("merge clicked");
            this.$emit("signalMerge");
        },
        approve() {
            console.log("approve clicked");
            this.$emit("signalApprove");
        },
        markAsReady() {
            console.log("mark as ready clicked");
            this.$emit("signalMarkAsReady");
        },
    },
};
</script>

<style scoped>
.action-button {
    border-radius: 5px;
    width: max-content;
}

.merge-button {
    background-color: #108548;
    color: #ffffff;
    margin-left: 0;
}

.merge-button:disabled {
    background-color: rgb(24, 192, 105);
}

.approve-button {
    background-color: #1f75cb;
    color: #ffffff;
}

.approve-button:disabled {
    background-color: #58a8f8;
}

.mark-as-ready-button {
    border: 1px solid black;
}

.help-text {
    font-size: 0.8rem;
    color: grey;
    opacity: 0.7;
}

.component-container {
    margin-top: 6px;
}
</style>
