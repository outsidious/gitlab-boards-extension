<template>
    <div>
        <img alt="approve-icon" class="img-icon" :src="approveIconUrl" />
        {{ approvers.length }}
    </div>
</template>

<script>
export default {
    props: ["approvers"],
    data() {
        return {
            approveIconUrl: "",
        };
    },
    mounted() {
        this.approveIconUrl = chrome.extension.getURL(
            require(`../../assets/sprite_icons/approval-solid.svg`)
        );
    },
};
</script>

<style scoped>
.img-icon {
    position: relative;
    bottom: 0.1rem;
}
</style>
