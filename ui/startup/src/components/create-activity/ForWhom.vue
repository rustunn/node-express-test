<template>
  <div>
    <h2>For whom this Activity is?</h2>

    <el-form-item label="Skills level">
      <el-radio-group v-model="value.skillsLevel" size="small">
        <el-radio-button label="Beginner"></el-radio-button>
        <el-radio-button label="Intermediate"></el-radio-button>
        <el-radio-button label="Advanced"></el-radio-button>
        <el-radio-button label="Expert"></el-radio-button>
        <el-radio-button label="Any"></el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="Age group">
      <el-radio-group v-model="value.ageGroup" size="small">
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
        <el-input-number size="small" v-model="value.customAgeMin" :min="0" :value="0"></el-input-number>
        <span class="supplement">To</span>
        <el-input-number size="small" v-model="value.customAgeMax" :min="0"></el-input-number>
      </div>
    </el-form-item>
  </div>
</template>

<script>
export default {
  props: ['value'],
  computed: {
    showCustomAgeGroup() {
      return this.value.ageGroup === 'Custom';
    },
  },
  watch: {
    value() {
      this.$emit('input', this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/common/styles/typography';
@import './common';

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
