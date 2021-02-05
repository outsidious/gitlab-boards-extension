<template>
    <div class="flex-container">
        <milestone-component> </milestone-component>
        <merge-request> </merge-request>
        <approve> </approve>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: "CardFooter vue component",
        };
    },
};
</script>

<style scoped>
.flex-container {
    width: 50%;
    display: flex;
    align-items: center;
    padding-top: 10px;
    justify-content: space-between;
}
</style>
