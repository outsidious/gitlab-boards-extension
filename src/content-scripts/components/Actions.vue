<template>
    <div class="component-container">
        <div class="help-text">actions</div>
        <div
            @mouseup.stop
            @mousedown.stop
            @click.stop
            @focus.stop
            @pointerdown.stop
            @pointerup.stop
            class="buttons-container"
        >
            <md-button
                v-on:click="merge()"
                class="merge-button btn btn-info mr-3 btn-md gl-button"
                v-bind="{
                    disabled:
                        this.mergeInfo.mergeId === -1 ||
                        this.mergeInfo.mergeStatus != 'can_be_merged' ||
                        this.mergeInfo.state != 'opened' ||
                        this.mergeInfo.has_conflicts ||
                        this.mergeInfo.draft,
                }"
                >Merge</md-button
            >

            <md-button
                v-if="checkWasntApproved()"
                v-on:click="approve()"
                class="btn mr-3 btn-info btn-md gl-button"
                v-bind="{
                    disabled: this.mergeInfo.mergeId === -1,
                }"
            >
                Approve
            </md-button>
            <md-button
                v-else
                v-on:click="unapprove()"
                class="btn mr-3 btn-warning btn-md gl-button btn-warning-secondary"
            >
                Disapprove
            </md-button>

            <md-button
                v-if="mergeInfo.draft"
                v-on:click="markAsReady()"
                class="btn btn-default btn-md gl-button"
                >Mark as ready</md-button
            >
            <md-button
                v-else
                v-on:click="markAsDraft()"
                class="btn btn-default btn-md gl-button"
                >Mark as draft</md-button
            >
        </div>
    </div>
</template>

<script>
import "vue-material-design-icons/styles.css";
export default {
    props: ["issueInfo", "mergeInfo", "userInfo"],
    methods: {
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
        checkWasntApproved() {
            let flag = true;
            this.issueInfo.approvers.forEach((approver) => {
                if (approver.user.id === this.userInfo.id) {
                    flag = false;
                    return;
                }
            });
            return flag;
        },
    },
};
</script>

<style scoped>
.action-button {
    border-radius: 5px;
    width: max-content;
}

button:disabled {
    background-color: #fafafa !important;
    cursor: not-allowed !important;
    pointer-events: all;
}

.merge-button {
    background-color: #108548 !important;
}

button {
    text-transform: capitalize;
    margin-left: 0;
    margin-right: 7px !important;
    padding: 8px 1px !important;
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
