<template>
  <el-form ref="form" :model="form" label-width="120px" :label-position="labelsPosition" class="form">
    <h1>Create new Activity</h1>
    <el-form-item label="Title">
      <el-input v-model="form.title" :clearable="true"></el-input>
    </el-form-item>
    <el-form-item label="Description">
      <el-input type="textarea" :autosize="{ minRows: 2 }"
 v-model="form.description"></el-input>
    </el-form-item>

    <h2>
      When is your activity taking place?
    </h2>
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
      <el-radio-group v-model="form.scheduleType" size="small">
        <el-radio-button label="Intermittent"></el-radio-button>
        <el-radio-button label="Recurrent"></el-radio-button>
        <el-radio-button label="Series"></el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Next activity date">
      <div v-for="(time, index) in form.nextActivityDates" :key="time">
        <el-tag type="info">{{timestampToDate(time)}}</el-tag>
        <el-button type="text" icon="el-icon-delete" @click="removeNextActivityDate(index)" class="delete-button"></el-button>
      </div>
      <el-date-picker
        v-model="temp.nextActivityDate"
        type="datetime"
        placeholder="Select date"
        format="yyyy/MM/dd HH:mm:ss"
        value-format="timestamp"
        :picker-options="{ disabledDate: dateInTheFuture }"
        @change="nextActivityDatePicked"
      >
      </el-date-picker>
    </el-form-item>

    <h2>For whom this Activity is?</h2>
    <el-form-item label="Skills level">
      <el-radio-group v-model="form.skillsLevel" size="small">
        <el-radio-button label="Beginner"></el-radio-button>
        <el-radio-button label="Intermediate"></el-radio-button>
        <el-radio-button label="Advanced"></el-radio-button>
        <el-radio-button label="Expert"></el-radio-button>
        <el-radio-button label="Any"></el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Age group">
      <el-radio-group v-model="form.ageGroup" size="small">
        <el-radio-button label="0-2"></el-radio-button>
        <el-radio-button label="3-5"></el-radio-button>
        <el-radio-button label="6-8"></el-radio-button>
        <el-radio-button label="9-12"></el-radio-button>
        <el-radio-button label="13-15"></el-radio-button>
        <el-radio-button label="16-18"></el-radio-button>
        <el-radio-button label="19+"></el-radio-button>
        <el-radio-button label="Custom"></el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Define custom age group" v-show="showCustomAgeGroup">
      <div class="custom-age-group">
        <span class="supplement">From</span>
        <el-input-number size="small" v-model="form.customAgeMin" :min="0" :value="0"></el-input-number>
        <span class="supplement">To</span>
        <el-input-number size="small" v-model="form.customAgeMax" :min="0"></el-input-number>
      </div>
    </el-form-item>

    <h2>Give final instructions to attendies</h2>
    <el-form-item label="What will be provided by you?">
      <el-input type="textarea" :autosize="{ minRows: 2 }"
 v-model="form.provided"></el-input>
    </el-form-item>
    <el-form-item label="What they should bring with them?">
      <el-input type="textarea" :autosize="{ minRows: 2 }"
 v-model="form.required"></el-input>
    </el-form-item>
    <el-form-item label="Any additional tips?">
      <el-input type="textarea" :autosize="{ minRows: 2 }"
 v-model="form.tips"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import screenSize from '@/common/scripts/screen-size';
import timestampToDate from '@/common/scripts/timestamp-to-date';

export default {
  name: 'home',
  data() {
    return {
      labelsPosition: 'top',
      temp: {
        nextActivityDate: '',
      },
      form: {
        title: '',
        description: '',
        date: '',
        skillsLevel: '',
        ageGroup: '',
        customAgeMin: '',
        customAgeMax: '',
        provided: '',
        required: '',
        tips: '',
        scheduleType: '',
        nextActivityDates: [],
      },
    };
  },
  mounted() {
    this.updateLabelsPosition();

    if (!window) return;
    this.$nextTick(() => {
      window.addEventListener('resize', this.updateLabelsPosition);
    });
  },
  beforeDestroy() {
    if (!window) return;
    window.removeEventListener('resize', this.updateLabelsPosition);
  },
  computed: {
    showCustomAgeGroup() {
      return this.form.ageGroup === 'Custom';
    },
  },
  methods: {
    dateInTheFuture(timestamp) {
      const offset = 1000 * 60 * 60; // One hour
      const time = new Date().getTime();
      return timestamp < time - offset;
    },
    nextActivityDatePicked(timestamp) {
      this.form.nextActivityDates.push(timestamp);
    },
    removeNextActivityDate(index) {
      this.form.nextActivityDates.splice(index, 1);
    },
    validateDate(timestamp) {
      if (timestamp > 1531724400000 && timestamp < 1532502000000) return false;
      return true;
    },
    screenSize,
    timestampToDate(timestamp) {
      return timestampToDate(timestamp, 'en-US', { hour: 'numeric', minute: 'numeric' });
    },
    updateLabelsPosition() {
      this.labelsPosition = this.screenSize('xs') === 'xs' ? 'top' : 'left';
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/common/styles/core';
@import 'src/common/styles/typography';

.form {
  max-width: 980px;
}

h1 {
  @include t-h1;
}

h2 {
  @include t-h2;
  margin-top: 60px;
}

.delete-button {
  color: $color-danger;
  margin-left: 6px;
}

.custom-age-group {
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: repeat(2, 32px);
  row-gap: 6px;

  .supplement {
    @include t-supplement;
    align-self: center;
    color: $color-dark-3;
  }
}
</style>

