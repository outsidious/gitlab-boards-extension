<template>
    <div>
        <div v-if="buttonMoreState === true">
            <i class="arrow up"></i>
            less
        </div>
        <div v-else>
            <i class="arrow down"></i>
            more
        </div>
    </div>
</template>

<script>
export default {
    props: ["buttonMoreState"],
};
</script>

<style scoped>
div {
    color: rgba(146, 146, 146, 1);
}

.arrow {
    border: 1px solid rgba(146, 146, 146, 1);
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    margin-right: 6px;
    position: relative;
}

.up {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    top: 2px;
}

.down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    bottom: 2px;
}
</style>
