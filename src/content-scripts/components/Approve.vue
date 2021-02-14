<template>
    <div>
        <md-icon>how_to_reg</md-icon>
        {{ approvalsQua }}
    </div>
</template>

<script>
export default {
    props: ["approvalsQua"],
};
</script>

<style scoped>
.md-icon {
    position: relative;
    bottom: 0.1rem;
}
</style>
