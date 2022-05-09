<template>
  <div class="loader" :style="{ backgroundColor: color }" />
</template>

<script lang="ts" setup>
defineProps<{
  color: string;
}>()
</script>

<style lang="scss">
@keyframes loading {
  0% {
    right: 100%;
    left: 0;
  }

  25% {
    right: 0;
    left: 0;
  }

  50% {
    left: 100%;
    right: 0;
  }

  75% {
    left: 0;
    right: 0;
  }

  100% {
    right: 100%;
    left: 0;
  }
}

.loader {
  background-color: #4479f1;
  height: 8px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 100%;
  animation: 4s infinite loading;
}
</style>
