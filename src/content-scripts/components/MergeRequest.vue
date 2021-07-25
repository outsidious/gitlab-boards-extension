<template>
    <div class="merge-flex-container">
        <img alt="branch-icon" class="img-icon" :src="branchIconUrl" />
        {{ mergesQua }}
        <img
            v-if="mergeStatus === 'passed' || mergeStatus === 'success'"
            class="img-icon"
            :src="checkIconUrl"
        />
        <img
            v-else-if="mergeStatus === 'failed'"
            class="img-icon"
            :src="clearIconUrl"
        />
        <img v-else class="img-icon" :src="notfoundIconUrl" />
    </div>
</template>

<script>
export default {
    props: ["mergesQua", "mergeStatus"],
    data() {
        return {
            branchIconUrl: "",
            checkIconUrl: "",
            successIconUrl: "",
            notfoundIconUrl: "",
        };
    },
    mounted() {
        this.branchIconUrl = chrome.extension.getURL(
            require(`../../assets/sprite_icons/branch.svg`)
        );
        this.checkIconUrl = chrome.extension.getURL(
            require(`../../assets/sprite_icons/check-circle.svg`)
        );
        this.clearIconUrl = chrome.extension.getURL(
            require(`../../assets/sprite_icons/status_failed.svg`)
        );
        this.notfoundIconUrl = chrome.extension.getURL(
            require(`../../assets/sprite_icons/question.svg`)
        );
    },
};
</script>

<style scoped>
.img-icon {
    position: relative;
    bottom: 0.1rem;
    padding-right: 1px;
}
</style>
