<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/settings">Settings</router-link>
  </nav>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  store.dispatch("getStateFromConfig");
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  background-color: #f3f4f5;
}

nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #4479f1;
    }
  }
}
</style>
