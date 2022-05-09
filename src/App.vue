<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/settings">Settings</router-link>
    <button @click="handleReadClick">Read FILE</button>
  </nav>
  <router-view />
</template>

<script lang="ts" setup>
import { invoke } from "@tauri-apps/api/tauri";

const handleReadClick = async () => {
  const res = await invoke('test_command', { luluFePath: '~/Projects/vuetest', targetPath: '~/Projects/vim-fundamentals' });
  console.log(res);
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  background-color: #F3F4F5;
}

nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
