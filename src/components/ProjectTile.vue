<template>
  <div class="container" v-bind:class="{ main: props.isMain }">
    <div class="header" v-bind:class="{ active: isActive || isMain }">
      <h1>{{ props.title }}</h1>
    </div>
    <div class="content">
      <!-- <span>Last built: 11min ago</span> -->
      <!-- <p>Shared components library</p> -->
      <img src="@/assets/unlinked.png" alt="unlinked">
      <!-- <button class="action" @click="handleLink">Link</button> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string,
  isActive?: boolean,
  isMain?: boolean
}>()

const handleLink = () => {
  console.log('click');
}
</script>

<style lang="scss">
.container {
  color: #5b6777;
  background-color: #FFF;
  border: 1px solid #ddd;

  .header {
    padding: 1rem;
    color: #f4f5f6;
    background-color: #aaa;

    h1 {
      font-size: 1.75rem;
      margin: 0;
    }

    &.active {
      background-color: #4479f1;
      color: #333;
    }
  }

  .content {
    /* height: 200px; */
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      transition: 0.25s all;
      cursor: pointer;

      &:hover {
        transform: scale(1.2) rotate(-20deg);
      }
    }
  }
}

.action {
  background-color: #888;
  border: none;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid #4479f1;
    color: #4479f1;
    background-color: #f2f6fc;
  }
}
</style>
