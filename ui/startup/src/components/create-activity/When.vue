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
      <el-radio-group v-model="type" size="small">
        <el-radio-button label="Intermittent"></el-radio-button>
        <el-radio-button label="Recurrent"></el-radio-button>
        <el-radio-button label="Series"></el-radio-button>
      </el-radio-group>
    </el-form-item>

    <div v-if="showIntermittent">
      <h3>Next activity date</h3>

      <div class="nextActivityDates">
        <el-tag v-for="(date, index) in dates" :key="date.startTime"
          type="info" closable @close="removeDate(index)">
          {{timestampToDate(date.startTime)}} - {{date.duration}}
        </el-tag>
      </div>

      <when-add-date v-if="addDateShown" @input="addDate" @cancel="closeAddDate"></when-add-date>
      <el-button plain v-else @click="openAddDate">Add another date</el-button>
    </div>
  </div>
</template>

<script>
import timestampToDate from '@/common/scripts/timestamp-to-date';
import WhenAddDate from './WhenAddDate.vue';

export default {
  data() {
    return {
      addDateShown: false,
      type: '',
      dates: [],
    };
  },
  computed: {
    showIntermittent() {
      return this.type === 'Intermittent';
    },
  },
  watch: {
    type(val) {
      this.dates = [];
      if (val === 'Intermittent') this.openAddDate();
    },
  },
  methods: {
    removeDate(index) {
      this.dates.splice(index, 1);
    },
    addDate(date) {
      this.dates.push(date);
      this.closeAddDate();
    },
    timestampToDate(timestamp) {
      return timestampToDate(timestamp, 'en-US', { hour: 'numeric', minute: 'numeric' });
    },
    openAddDate() {
      this.addDateShown = true;
    },
    closeAddDate() {
      this.addDateShown = false;
    },
  },
  components: {
    WhenAddDate,
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
