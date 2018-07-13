<template>
  <el-card class="card" :body-style="{ padding: 0 }" shadow="never">
    <div class="body">
      <img src="@/assets/swim1.jpg" class="image">
      <font-awesome-icon icon="heart" class="save-icon"></font-awesome-icon>
    </div>
    <div class="metadata">
      <p class="title metadata-item">{{ activity.title }}</p>
      <div class="metadata-item tag">
        <!-- <font-awesome-icon icon="calendar-alt" class="tag-icon"></font-awesome-icon> -->
        <time class="time">{{ timestampToDate(activity.startTime) }}</time>
      </div>
      <div class="metadata-item tag">
        <!-- <font-awesome-icon icon="map-marked-alt" class="tag-icon"></font-awesome-icon> -->
        {{activity.location}}
      </div>
      <div class="metadata-item tag price">
        <!-- <font-awesome-icon icon="tag" class="tag-icon"></font-awesome-icon> -->
        ${{activity.price}} per visit
      </div>
      <div class="metadata-item rating">
        <el-rate v-model="activity.rating" disabled></el-rate>
        {{activity.votes}}
      </div>
    </div>
  </el-card>
</template>

<script>
import timestampToDate from '@/common/scripts/timestamp-to-date';

export default {
  name: 'activity-card',
  props: {
    activity: {
      type: Object,
    },
  },
  methods: {
    timestampToDate(timestamp) {
      return timestampToDate(timestamp, 'en-US', { hour: 'numeric', minute: 'numeric' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/common/styles/colors';

.card {
  position: relative;

  .body {
    position: relative;

    .image {
      width: 100%;
    }

    .save-icon {
      position: absolute;
      right: 10px;
      bottom: 10px;
      color: $color-light-1;
      font-size: 30px;
    }
  }

  .metadata {
    padding: 8px;
    font-size: 14px;

    .metadata-item {
      flex-grow: 1;
      margin-bottom: 6px;
      color: $color-dark-3;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .title {
      margin: 0 0 10px 0;
      line-height: 1.1;
      font-size: 16px;
      font-weight: bold;
      color: $color-dark-1;
    }

    .tag {
      margin-right: 6px;

      .tag-icon {
        margin-right: 6px;
      }
    }

    .price {
      // color: #606266;
    }

    .rating {
      margin-top: 4px;
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
