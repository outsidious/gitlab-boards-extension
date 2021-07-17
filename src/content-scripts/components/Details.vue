<template>
    <div class="component-container">
        <div class="help-text">details</div>
        <div class="space"> </div>
        <div v-if="milestoneInfo.milestoneTitle!='-'" class="elem-container">
            <div class="help-title">Milestone:</div>
            <a :href="this.milestoneInfo.web_url" class="text-title">
                {{ milestoneInfo.milestoneTitle }}
            </a>
        </div>
        <div class="space"> </div>
        <div v-if="mergeInfo.mergeTitle!==''" class="elem-container">
            <div class="help-title">Merge:</div>
            <div class="text-title">
                {{ mergeInfo.mergeTitle }}
            </div>
        </div>
        <div class="space"> </div>
    </div>
</template>

<script>
import "vue-material-design-icons/styles.css";
export default {
    props: ["milestoneInfo", "mergeInfo"],
    methods: {},
};
</script>

<style scoped>
.help-text {
    font-size: 0.8rem;
    color: grey;
    opacity: 0.7;
}

.help-title {
    color: grey;
    opacity: 0.7;
}

a {
    color: black;
    font-weight: 400;
}

.text-title {
    margin-left: 10px;
}

.elem-container {
    display: flex;
}

div.space {
    width: 100%;
    height: 7px;
}
</style>
