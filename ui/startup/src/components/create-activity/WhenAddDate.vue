<template>
  <div>
    <el-form-item label="Date">
      <el-date-picker
        v-model="state.date"
        type="date"
        placeholder="Select a date"
        format="M/d/yyyy"
        value-format="timestamp"
        :picker-options="{ disabledDate: datesInThePast }"
      >
      </el-date-picker>
    </el-form-item>

    <el-form-item label="Beginning Time">
      <el-time-picker
        v-model="state.time"
        value-format="HH:MM"
        :picker-options="{
          format: 'h:mm A'
        }"
        placeholder="Select time">
      </el-time-picker>
    </el-form-item>

    <el-form-item label="Duration, Hours">
      <el-input-number size="small" v-model="state.durationHours" :step="1" :min="0" :max="72" label="Hours"></el-input-number>
    </el-form-item>

    <el-form-item label="Minutes">
      <el-input-number size="small" v-model="state.durationMinutes" :step="5" :min="0" :max="55" label="Minutes"></el-input-number>
    </el-form-item>

    <el-button type="primary" @click="add">Add</el-button>
    <el-button plain @click="cancel">Cancel</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultState: {
        date: '',
        time: '',
        durationHours: 0,
        durationMinutes: 0,
      },
      state: {},
    };
  },
  beforeMount() {
    this.resetState();
  },
  computed: {
    timestamp() {
      const arr = this.state.time.split(':');
      const hours = parseInt(arr[0], 10);
      const minutes = parseInt(arr[1], 10);
      return this.state.date + this.timeToMs(hours, minutes);
    },
    duration() {
      return this.timeToMs(this.state.durationHours, this.state.durationMinutes);
    },
  },
  methods: {
    datesInThePast(timestamp) {
      const offset = 1000 * 60 * 60 * 24; // One day
      const time = new Date().getTime();
      return timestamp < time - offset;
    },
    timeToMs(hours, minutes) {
      return (hours * 60 + minutes) * 60 * 1000;
    },
    add() {
      this.$emit('input', { startTime: this.timestamp, duration: this.duration });
      this.resetState();
    },
    cancel() {
      this.$emit('cancel');
      this.resetState();
    },
    resetState() {
      this.state = { ...this.defaultState };
    },
  },
};
</script>

