<template>
    <div class="component-container">
        <div class="help-text">details</div>
        <div class="space"></div>
        <div v-if="milestoneInfo.milestoneTitle != '-'" class="elem-container">
            <div class="help-title">Milestone:</div>
            <a
                :href="this.milestoneInfo.web_url"
                class="text-title"
                @click.stop
                @focusin.stop
                @mousedown.stop
            >
                {{ milestoneInfo.milestoneTitle }}
            </a>
        </div>
        <div class="space"></div>
        <div v-if="mergeInfo.mergeTitle !== ''" class="elem-container">
            <div class="help-title">Merge:</div>
            <a
                :href="this.mergeInfo.changesUrl"
                class="text-title"
                @click.stop
                @focusin.stop
                @mousedown.stop
            >
                "{{ mergeInfo.mergeTitle }}"
            </a>
        </div>
        <div class="space"></div>
        <div v-if="1" class="elem-container">
            <div class="help-title">Approvers:</div>
            <div
                class="avatar-container"
                v-for="item in mergeInfo.approvers"
                :key="item.user.id"
            >
                <div class="img-space"></div>
                <VueCustomTooltip label="long loong long text">
                    <a
                        @click.stop
                        @focusin.stop
                        @mousedown.stop
                        class="img-container"
                        v-bind:href="item.user.web_url"
                    >
                        <img
                            v-bind:src="item.user.avatar_url + '&size=24'"
                            alt=""
                        />
                    </a>
                </VueCustomTooltip>
            </div>
        </div>
        <div class="space"></div>
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
    align-items: center;
}

.avatar-container {
    display: flex;
}

img {
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
}

.img-container {
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
}

.img-space {
    width: 8px;
}

.space {
    width: 100%;
    height: 8px;
}
</style>
