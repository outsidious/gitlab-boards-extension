<template>
    <div>
         <clock-time-four-outline />
         {{ due_date }}
    </div>
</template>

<script>
import ClockTimeFourOutline from "vue-material-design-icons/ClockTimeFourOutline.vue";
export default {
    props: ['due_date'],
    components: {
        ClockTimeFourOutline
    },
};
</script>

<style scoped>
.material-design-icon__svg {
    position: relative;
    bottom: -0.1rem;
}
</style>