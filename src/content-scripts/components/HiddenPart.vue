<template>
    <div>
        <div class="help-text"> actions </div>
        <a :href="this.changesUrl"> Show changes </a>
    </div>
</template>

<script>
import "vue-material-design-icons/styles.css"
export default {
    props: ['changesUrl'],
    mounted() {}
};
</script>

<style scoped>
.help-text {
    font-size: 0.7rem;
    color: grey;
    opacity: 0.7;
}
</style>