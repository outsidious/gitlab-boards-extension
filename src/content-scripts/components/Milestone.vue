<template>
    <div class="milestone-container">
        <svg class="s16 base-color" data-testid="clock-icon">
            <use :xlink:href="iconsUrl + clockIconUrl"></use>
        </svg>
        {{ due_date }}
    </div>
</template>

<script>
export default {
    props: ["due_date", "iconsUrl"],
    data() {
        return {
            clockIconUrl: "#clock",
        };
    },
};
</script>

<style scoped>
.base-color {
    fill: #929292;
}
</style>
