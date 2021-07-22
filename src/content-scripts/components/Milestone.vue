<template>
    <div class="milestone-container">
        <img alt="clock-icon" class="img-icon" :src="clockIconUrl" />
        {{ due_date }}
    </div>
</template>

<script>
export default {
    props: ["due_date"],
    data() {
        return {
            clockIconUrl: "",
        };
    },
    mounted() {
        this.clockIconUrl = chrome.extension.getURL(
            require(`../../assets/sprite_icons/clock.svg`)
        );
    },
};
</script>

<style scoped>
.img-icon {
    position: relative;
    bottom: 0.1rem;
}

/*
.milestone-container {
    width: 35%;
}*/
</style>
