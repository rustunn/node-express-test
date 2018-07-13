<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="16">
        <el-input placeholder='Try "Tennis classes"'>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <activities-grid :activities="activities"></activities-grid>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ActivitiesGrid from '@/components/ActivitiesGrid.vue';

export default {
  name: 'home',
  data() {
    return {
      currentDate: new Date(),
    };
  },
  computed: {
    ...mapState(['activities']),
  },
  methods: {
    prefixImg(url) {
      return `${url}`;
    },
  },
  components: {
    ActivitiesGrid,
  },
};
</script>
