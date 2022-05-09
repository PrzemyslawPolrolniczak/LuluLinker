<template>
  <div class="home">
    <div class="lulu-fe">
      <div class="top">
        <h1>@lulu/fe</h1>
        <button @click="setIsLuluFePushing" :disabled="isLuluFePushing">Push</button>
      </div>
      <span>Last push: {{ lastPushDate }}</span>
      <LoaderComponent v-if="isLuluFePushing" color="#4479f1" />
    </div>
    <div class="tile-grid">
      <ProjectTile title="Project Wizard" isDisabled />
      <ProjectTile title="Lulu Website" isActive />
      <ProjectTile title="Lulu Direct UI" isLoading />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

import ProjectTile from '@/components/ProjectTile.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';

const store = useStore();
const isLuluFePushing = computed(() => store.state.isLuluFePushing)
const lastPushDate = computed(() => store.state.lastPushDate);
const setIsLuluFePushing = () => store.commit('setIsLuluFePushing');
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
}

.lulu-fe {
  background: #fff;
  padding: 1rem 2rem 2rem;
  border: 1px solid #ddd;
  position: relative;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      padding: 0.75rem 1.5rem;
      background-color: #4479f1;
      border: none;
      color: #fff;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.1s;

      &:hover {
        background-color: #3d6cd8;
      }

      &:active {
        background-color: #2f54a8;
      }

      &:disabled {
        pointer-events: none;
        background: #bbb;
      }
    }
  }
}

.tile-grid {
  margin-top: 8px;
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
