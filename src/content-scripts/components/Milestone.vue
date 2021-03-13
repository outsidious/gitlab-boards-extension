<template>
    <div class="milestone-container">
        <img src="../../assets/sprite_icons/clock.svg" alt="clock">
        {{ due_date }}
    </div>
</template>

<script>
export default {
    props: ["due_date"],
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
