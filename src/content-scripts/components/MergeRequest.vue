<template>
    <div class="merge-flex-container">
        <source-branch />
        <div> {{mergesQua}} </div>
        <check-circle-outline fillColor="#27AE60"/>
    </div>
</template>

<script>
import CheckCircleOutline from "vue-material-design-icons/CheckCircleOutline";
import SourceBranch from "vue-material-design-icons/SourceBranch";
import "vue-material-design-icons/styles.css"
export default {
    props: ['mergesQua'],
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

.merge-flex-container {
    display: flex;
}

div {
    padding-right: 1px;
    padding-left: 0;
    position: relative;
    right: 1px;
}
</style>