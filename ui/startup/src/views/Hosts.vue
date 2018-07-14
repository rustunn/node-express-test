<template>
  <el-form ref="form" :model="form" label-width="120px" :label-position="labelsPosition" class="form">
    <h1>Create new Activity</h1>
    <general v-model="form.general"></general>
    <when v-model="form.when"></when>
    <for-whom v-model="form.forWhom"></for-whom>
    <for-attendees v-model="form.forAttendees"></for-attendees>
  </el-form>
</template>

<script>
import screenSize from '@/common/scripts/screen-size';

import General from '@/components/create-activity/General.vue';
import When from '@/components/create-activity/When.vue';
import ForWhom from '@/components/create-activity/ForWhom.vue';
import ForAttendees from '@/components/create-activity/ForAttendees.vue';

export default {
  name: 'home',
  data() {
    return {
      labelsPosition: 'top',
      form: {
        general: {
          title: '',
          description: '',
        },
        when: {
          scheduleType: '',
          nextActivityDates: [],
        },
        forWhom: {
          skillsLevel: '',
          ageGroup: '',
          customAgeMin: '',
          customAgeMax: '',
        },
        forAttendees: {
          provided: '',
          required: '',
          tips: '',
        },
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
    nextActivityDatePlaceholder() {
      return this.form.nextActivityDates.length ? 'Select another date' : 'Select a date';
    },
  },
  methods: {
    screenSize,
    updateLabelsPosition() {
      this.labelsPosition = this.screenSize('xs') === 'xs' ? 'top' : 'left';
    },
  },
  components: {
    General,
    When,
    ForWhom,
    ForAttendees,
  },
};
</script>

<style lang="scss" scoped>
@import 'src/common/styles/typography';

.form {
  max-width: 980px;
}

h1 {
  @include t-h1;
}
</style>

