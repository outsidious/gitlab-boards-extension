<template>
    <div class="component-container">
        <div class="help-text">details</div>
        <div class="space"> </div>
        <div class="milestone">
            <div class="help-title">Milestone:</div>
            <a :href="this.milestoneInfo.web_url">
                {{ milestoneInfo.milestoneTitle }}
            </a>
        </div>
        <div class="space"> </div>
    </div>
</template>

<script>
import "vue-material-design-icons/styles.css";
export default {
    props: ["milestoneInfo"],
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
    margin-left: 5px;
}

.milestone {
    display: flex;
}

div.space {
    width: 100%;
    height: 7px;
}
</style>
