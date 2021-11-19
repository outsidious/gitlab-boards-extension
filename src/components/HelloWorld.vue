<template>
    <div class="popup-container">
        <div class="img-con">
            <img :src="icon" alt="lol" />
        </div>
        <div class="menu">
            <a v-on:click="openOptions()"> Настройки </a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            icon: "",
        };
    },
    methods: {
        openOptions() {
            chrome.tabs.create({ url: "/options.html" });
        },
    },
    mounted() {
        this.icon = chrome.extension.getURL(require(`../assets/logo.png`));
    },
};
</script>

<style scoped>
img {
    width: 200px;
    height: 200px;
}

a {
    font-weight: 400;
    font-size: 16px;
    cursor: pointer;
    color: blue;
}

.menu {
    padding-right: 15px;
}

a:hover {
    text-decoration: underline;
}

.popup-container {
    width: inherit;
    height: inherit;
    display: flex;
    justify-content: space-around;
}
</style>
