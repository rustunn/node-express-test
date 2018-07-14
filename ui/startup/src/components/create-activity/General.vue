<template>
  <div>
    <el-form-item label="Title">
      <el-input v-model="value.title" :clearable="true"></el-input>
    </el-form-item>
    <el-form-item label="Description">
      <el-input type="textarea" :autosize="{ minRows: 2 }"
  v-model="value.description"></el-input>
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

