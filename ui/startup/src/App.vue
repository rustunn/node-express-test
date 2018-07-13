<template>
  <el-container id="app">
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">
          <router-link to="/">Home</router-link>
        </el-menu-item>
        <el-menu-item index="2">Log In</el-menu-item>
        <el-menu-item index="3">Sign Up</el-menu-item>
        <el-menu-item index="4">
          <router-link to="/become-a-host">Host an Activity</router-link>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>


<style lang="scss">
html, body {
  padding: 0;
  margin: 0;
  border: 0;
}

a {
  text-decoration: none;
}

#app {
  font-family: system-ui;
}
</style>
