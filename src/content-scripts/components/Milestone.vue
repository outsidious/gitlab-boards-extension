<template>
    <div class="milestone-container">
        <img alt="clock-icon" :src="clockIconUrl"/>
        {{ due_date }}
    </div>
</template>

<script>
import "../../assets/sprite_icons/clock.svg";
export default {
    props: ["due_date"],
    data() {
        return {
            clockIconUrl: "",
        };
    },
    mounted() {
        this.clockIconUrl = chrome.extension.getURL(require(`../../assets/sprite_icons/clock.svg`))
    },
};
</script>

<style scoped>
.md-icon {
    position: relative;
    bottom: 0.1rem;
}

.milestone-container {
    width: 35%;
}
</style>
