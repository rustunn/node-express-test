<template>
  <div class="grid">
    <activity-card v-for="item in activities" :activity="item" :key="item.id" class="card"></activity-card>
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-top: 20px;

  .card {
    margin: 10px;

    &:nth-child(4n + 1) {
      margin-left: 0;
    }

    &:nth-child(4n) {
      margin-right: 0;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 991px) {
    grid-template-columns: 1fr 1fr 1fr;

    .card {
      &:nth-child(3n + 1) {
        margin-left: 0;
      }

      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }

  @media screen and (min-width: 500px) and (max-width: 767px) {
    grid-template-columns: 1fr 1fr;

    .card {
      &:nth-child(2n + 1) {
        margin-left: 0;
      }

      &:nth-child(2n) {
        margin-right: 0;
      }
    }
  }

  @media screen and (min-width: 320px) and (max-width: 499px) {
    grid-template-columns: 1fr;

    .card {
      margin-left: 0;
      margin-right: 0;
    }
  }
}
</style>
