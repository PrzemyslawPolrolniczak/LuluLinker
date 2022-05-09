<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/settings">Settings</router-link>
    <button @click="handleReadClick">Read FILE</button>
  </nav>
  <div v-if="!isLoading">
    <router-view />
  </div>
  <div v-else>L O A D I N G</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { invoke } from "@tauri-apps/api/tauri";

const isLoading = ref(false);

const handleReadClick = async () => {
  isLoading.value = true;
  const res = await invoke('test_command', { luluFePath: '~/Projects/vuetest', targetPath: '~/Projects/vim-fundamentals' });
  isLoading.value = false;
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
