<template>
    <div class="merge-flex-container">
        <source-branch />
        {{mergesQua}}
        <md-icon v-if= "mergeStatus==='passed'" style="color: green">check_circle_outline</md-icon>
        <md-icon v-else-if= "mergeStatus==='failed'" style="color: red">cancel</md-icon>
        <md-icon v-else style="color: yellow">help_outline</md-icon>
    </div>
</template>

<script>
import SourceBranch from "vue-material-design-icons/SourceBranch";
import "vue-material-design-icons/styles.css"
export default {
    props: ['mergesQua', 'mergeStatus'],
    components: {
        SourceBranch
    },
    mounted() {
        
    }
};
</script>

<style scoped>
.md-icon {
    position: relative;
    bottom: 0.1rem;
}
</style>