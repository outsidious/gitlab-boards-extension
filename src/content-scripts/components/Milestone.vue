<template>
    <div class="milestone-container">
         <md-icon>watch_later</md-icon>
         {{ due_date }}
    </div>
</template>

<script>
export default {
    props: ['due_date'],
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