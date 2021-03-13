<template>
    <div class="popup-container">
        <a class="popup-elem" v-on:click="openOptions()"> Options page </a>
    </div>
</template>

<script>
export default {
    name: "HelloWorld",
    methods: {
        openOptions() {
			chrome.tabs.create({'url': "/options.html" } )
        },
    },
};
</script>

<style scoped>
.popup-elem {
    color: black;
    font-weight: 600;
	font-size: 25pt;
}

.popup-container {
	width: inherit;
	height: inherit;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
