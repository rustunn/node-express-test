<template>
  <form>
    <el-row type="flex" justify="start">
      <el-col :span="12">
        <el-input placeholder="Title" v-model="title" :max="40" :clearable="true"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="start">
      <el-col :span="12">
        <el-input type="textarea" autosize placeholder="Description" v-model="description"></el-input>
      </el-col>
    </el-row>
    <el-date-picker v-model="date" type="date" placeholder="Pick a Date" format="yyyy/MM/dd" value-format="timestamp"
    :picker-options="{ disabledDate: validateDate }">
    </el-date-picker>
  </form>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      title: '',
      description: '',
      date: '',
    };
  },
  methods: {
    validateDate(timestamp) {
      if (timestamp > 1531724400000 && timestamp < 1532502000000) return false;
      return true;
    },
  },
};
</script>
