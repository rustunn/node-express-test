<template>
  <div>
    <h2>Give final instructions to attendies</h2>

    <el-form-item label="What will be provided by you?">
      <el-input type="textarea" :autosize="{ minRows: 2 }"
v-model="value.provided"></el-input>
    </el-form-item>

    <el-form-item label="What they should bring with them?">
      <el-input type="textarea" :autosize="{ minRows: 2 }"
v-model="value.required"></el-input>
    </el-form-item>

    <el-form-item label="Any additional tips?">
      <el-input type="textarea" :autosize="{ minRows: 2 }"
v-model="value.tips"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  props: ['value'],
  watch: {
    value() {
      this.$emit('input', this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './common';
</style>
