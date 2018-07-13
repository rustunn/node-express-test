<template>
  <div class="grid">
    <activity-card v-for="item in activities" :activity="item" :key="item.id"></activity-card>
  </div>
</template>

<script>
import ActivityCard from '@/components/ActivityCard.vue';

export default {
  props: {
    activities: {
      type: Array,
    },
  },
  components: {
    ActivityCard,
  },
};
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
}
</style>
