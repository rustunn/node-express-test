<template>
  <div>
    <h2>When is your activity taking place?</h2>

    <el-form-item>
      <div slot="label">
        Schedule type
        <el-popover
          placement="top-start"
          title="Scheduling types"
          width="200"
          trigger="hover"
          content="this is content, this is content, this is content">
          <font-awesome-icon icon="question-circle" slot="reference"></font-awesome-icon>
        </el-popover>
      </div>
      <el-radio-group v-model="value.scheduleType" size="small">
        <el-radio-button label="Intermittent"></el-radio-button>
        <el-radio-button label="Recurrent"></el-radio-button>
        <el-radio-button label="Series"></el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="Next activity date">
      <div class="nextActivityDates">
        <el-tag v-for="(time, index) in value.nextActivityDates" :key="time"
          type="info" closable @close="removeNextActivityDate(index)">
          {{timestampToDate(time)}}
        </el-tag>
        <el-date-picker
          v-model="nextActivityDate"
          type="datetime"
          :placeholder="nextActivityDatePlaceholder"
          format="yyyy/MM/dd HH:mm:ss"
          value-format="timestamp"
          :picker-options="{ disabledDate: dateInTheFuture }"
          @change="nextActivityDatePicked"
        >
        </el-date-picker>
      </div>
    </el-form-item>
  </div>
</template>

<script>
import timestampToDate from '@/common/scripts/timestamp-to-date';

export default {
  props: ['value'],
  data() {
    return {
      nextActivityDate: '',
    };
  },
  computed: {
    nextActivityDatePlaceholder() {
      return this.value.nextActivityDates.length ? 'Select another date' : 'Select a date';
    },
  },
  watch: {
    value() {
      this.$emit('input', this.value);
    },
  },
  methods: {
    dateInTheFuture(timestamp) {
      const offset = 1000 * 60 * 60; // One hour
      const time = new Date().getTime();
      return timestamp < time - offset;
    },
    nextActivityDatePicked(timestamp) {
      this.value.nextActivityDates.push(timestamp);
      this.nextActivityDate = '';
    },
    removeNextActivityDate(index) {
      this.value.nextActivityDates.splice(index, 1);
    },
    timestampToDate(timestamp) {
      return timestampToDate(timestamp, 'en-US', { hour: 'numeric', minute: 'numeric' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/common/styles/colors';
@import './common';

.delete-button {
  color: $color-danger;
  margin-left: 6px;
}

.nextActivityDates {
  display: grid;
  grid-template-columns: min-content;
  grid-gap: 6px;
}
</style>
