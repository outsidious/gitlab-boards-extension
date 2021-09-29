<template>
    <div class="component-container">
        <div class="help-text">details</div>
        <div class="space"></div>
        <div v-if="milestoneInfo.milestoneTitle != '-'" class="elem-container">
            <div class="help-title">Milestone:</div>
            <a
                :href="this.milestoneInfo.web_url"
                class="text-title"
                @click.stop
                @focusin.stop
                @mousedown.stop
            >
                {{ milestoneInfo.milestoneTitle }}
            </a>
        </div>
        <div class="space"></div>
        <div v-if="mergeInfo.mergeTitle !== ''" class="elem-container">
            <div class="help-title">Merge:</div>
            <a>
                <svg
                    v-if="mergeInfo.mergeConflicts"
                    class="conflicts-icon s20"
                    data-testid="conflicts-icon"
                >
                    <use :xlink:href="iconsUrl + conflictsIconUrl"></use>
                </svg>
                <md-tooltip md-direction="left">
                    There are merge conflicts
                </md-tooltip>
            </a>
            <a
                :href="this.mergeInfo.changesUrl.slice(0, -6)"
                class="text-title"
                @click.stop
                @focusin.stop
                @mousedown.stop
            >
                "{{ mergeInfo.mergeTitle }}"
            </a>
        </div>
        <div class="space"></div>
        <div
            v-if="issueInfo.approvers.length != 0"
            class="elem-container approvers-container"
        >
            <div class="help-title">Approvers:</div>
            <div
                class="avatar-container"
                v-for="item in issueInfo.approvers"
                :key="item.user.id"
            >
                <div class="img-space"></div>
                <md-avatar class="md-small">
                    <a
                        @click.stop
                        @focusin.stop
                        @mousedown.stop
                        class="img-container"
                        v-bind:href="item.user.web_url"
                    >
                        <img v-bind:src="item.user.avatar_url" alt="Avatar" />
                        <md-tooltip md-direction="right">
                            Approved by: {{ item.user.name }}
                        </md-tooltip>
                    </a>
                </md-avatar>
            </div>
        </div>
        <div class="space"></div>
    </div>
</template>

<script>
import "vue-material-design-icons/styles.css";
export default {
    props: ["milestoneInfo", "issueInfo", "iconsUrl"],
    data() {
        return {
            conflictsIconUrl: "#status_warning",
            mergeInfo: this.issueInfo.lastRelatedMerge,
        };
    },
};
</script>

<style scoped>
.help-text {
    font-size: 0.8rem;
    color: grey;
    opacity: 0.7;
}

.help-title {
    color: grey;
    opacity: 0.7;
    width: 76px;
}

a {
    color: black;
    font-weight: 400;
}

.text-title {
    margin-left: 10px;
    width: 240px;
}

.elem-container {
    display: flex;
    align-items: center;
}

.approvers-container {
    align-items: center;
}

.avatar-container {
    display: flex;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
}

img {
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
}

.img-space {
    width: 8px;
}

.md-tooltip {
    font-weight: 400;
    font-size: 13px;
    color: aliceblue;
    background-color: rgb(22, 21, 21);
    opacity: 0.8;
    border-radius: 5px;
    z-index: 1000;
}

.space {
    width: 100%;
    height: 8px;
}

.s20 {
    width: 20px;
    height: 20px;
}

.conflicts-icon {
    cursor: pointer;
}
</style>
