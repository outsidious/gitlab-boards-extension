<template>
    <div>
         <clock-time-four-outline />
         <div class="date"> Nov 20 </div>
    </div>
</template>

<script>
import ClockTimeFourOutline from "vue-material-design-icons/ClockTimeFourOutline.vue";
export default {
    components: {
        ClockTimeFourOutline
    }
};
</script>

<style scoped>
.date {
    padding-left: 2px;
}

.material-design-icon__svg {
    position: relative;
    bottom: -0.1rem;
}
</style>