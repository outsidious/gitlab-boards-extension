<template>
    <div>
        <source-branch />
        1
        <check-circle-outline fillColor="#27AE60"/>
    </div>
</template>

<script>
import CheckCircleOutline from "vue-material-design-icons/CheckCircleOutline";
import SourceBranch from "vue-material-design-icons/SourceBranch";
import "vue-material-design-icons/styles.css"
export default {
    components: {
        CheckCircleOutline,
        SourceBranch
    }
};
</script>

<style scoped>
.material-design-icon__svg {
    padding-right: 0px;
    position: relative;
    bottom: -0.1rem;
}

chech-circle-outline {
    fill: "#27AE60";
}
</style>