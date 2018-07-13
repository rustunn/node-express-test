<template>
  <el-card class="card" :body-style="{ padding: 0 }">
    <img src="@/assets/swim1.jpg" class="image">
    <div class="metadata">
      <p class="title metadata-item">{{ activity.title }}</p>
      <el-tag size="mini" class="metadata-item">
        <font-awesome-icon icon="calendar-alt" class="tag-icon"></font-awesome-icon>
        <time class="time">{{ timestampToDate(activity.startTime) }}</time>
      </el-tag>
      <el-tag type="success" size="mini" class="metadata-item">
        <font-awesome-icon icon="tag" class="tag-icon"></font-awesome-icon>${{activity.price}}
      </el-tag>
      <el-rate
        v-model="activity.rating"
        disabled
        show-text
        :texts="['Ooops', 'Regular', 'Good', 'Great', 'Exceptional']"
        text-color="#909399"
        class="metadata-item"
      >
      </el-rate>
    </div>
  </el-card>
</template>

<script>
import timestampToDate from '@/common/timestamp-to-date';

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
.card {
  width: 300px;
  padding: 0;
}

.image {
  width: 100%;
}

.metadata {
  padding: 8px;
  font-size: 14px;

  .metadata-item {
    flex-grow: 1;
    margin-bottom: 6px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .title {
    // font-weight: bold;
    margin: 0 0 10px 0;
    line-height: 1.1;
    font-size: 16px;
  }

  .tag-icon {
    margin-right: 6px;
  }
}
</style>
