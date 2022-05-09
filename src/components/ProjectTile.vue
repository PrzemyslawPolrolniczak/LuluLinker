<template>
  <div class="container" v-bind:class="{ disabled: isDisabled }">
    <div class="header" v-bind:class="{ active: isActive }">
      <h1>{{ props.title }}</h1>
    </div>
    <div @click="handleLink" class="content" v-bind:class="{ active: isActive, loading: isLoading }">
      <img v-if="isActive" src="@/assets/linked.png">
      <img v-else src="@/assets/unlinked.png">
      <span>{{ status }}</span>
    </div>

    <LoaderComponent v-if="isLoading" :color="isActive ? '#bbbbbb' : '#4479f1'" />
  </div>
</template>

<script lang="ts" setup>
import LoaderComponent from '@/components/LoaderComponent.vue'

const props = defineProps<{
  title: string,
  isActive?: boolean,
  isDisabled?: boolean,
  isLoading?: boolean,
}>()

const status = props.isLoading ? "Loading..." : props.isActive ? 'Linked' : 'Unlinked'

const handleLink = () => {
  if (props.isDisabled || props.isLoading) return;
}
</script>

<style lang="scss">
.container {
  color: #5b6777;
  background-color: #FFF;
  border: 1px solid #ddd;
  position: relative;

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .header {
    padding: 1rem 1rem 0.5rem;
    color: #f4f5f6;
    background-color: #aaa;

    &.active {
      background-color: #4479f1;
    }

    h1 {
      font-size: 1.75rem;
      margin: 0;
    }
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    flex-direction: column;
    cursor: pointer;

    img {
      transition: 0.25s all;
    }

    span {
      margin-top: 1rem;
    }

    &:hover img {
      transform: scale(1.2) rotate(-20deg);
    }

    &:active img {
      transform: scale(1) rotate(-20deg);
    }

    &.active {
      span {
        color: #4479f1;
        font-weight: 700;
      }
    }

    &.loading {
      cursor: not-allowed;

      &:hover img,
      &:active img {
        transform: initial;
      }
    }
  }
}
</style>
