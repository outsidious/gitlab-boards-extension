<template>
    <div>
        <svg class="s16 base-color" data-testid="approval-icon">
            <use :xlink:href="iconsUrl + approveIconUrl"></use>
        </svg>
        {{ approvers.length }}
    </div>
</template>

<script>
export default {
    props: ["approvers", "iconsUrl"],
    data() {
        return {
            approveIconUrl: "#approval",
        };
    },
};
</script>

<style scoped>
.base-color {
    fill: #929292;
}
</style>
