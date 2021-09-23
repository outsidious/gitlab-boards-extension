<template>
    <div class="merge-flex-container">
        <svg class="s16 base-color" data-testid="git-merge-icon">
            <use :xlink:href="iconsUrl + branchIconUrl"></use>
        </svg>
        {{ mergesQua }}
        <svg
            v-if="mergeStatus === 'passed' || mergeStatus === 'success'"
            class="s16 success-color"
            data-testid="success-icon"
        >
            <use :xlink:href="iconsUrl + successIconUrl"></use>
        </svg>
        <svg
            v-else-if="mergeStatus === 'failed'"
            class="s16 failed-color"
            data-testid="failed-icon"
        >
            <use :xlink:href="iconsUrl + failedIconUrl"></use>
        </svg>
        <svg v-else class="s16 not-found-color" data-testid="not-found-icon">
            <use :xlink:href="iconsUrl + notfoundIconUrl"></use>
        </svg>
    </div>
</template>

<script>
export default {
    props: ["mergesQua", "mergeStatus", "iconsUrl"],
    data() {
        return {
            branchIconUrl: "#git-merge",
            successIconUrl: "#status_success",
            failedIconUrl: "#status_failed",
            notfoundIconUrl: "#question-o",
        };
    },
};
</script>

<style scoped>
.base-color {
    fill: #929292;
}

.success-color {
    fill: #27ae60;
}

.failed-color {
    fill: #b21616;
}

.not-found-color {
    fill: #ffc807;
}
</style>
