<template>
  <div class="home">
    <div class="grid">
      <div class="lulu-fe">
        <div class="top">
          <h1>@lulu/fe</h1>
          <button @click="handleLuluFePush" :disabled="!!currentPushing">
            Push
          </button>
        </div>
        <span>Last push: {{ lastPushDate }}</span>
        <LoaderComponent v-if="currentPushing === 'LULU_FE'" color="#4479f1" />
      </div>

      <ProjectTile
        v-for="{ name, code } in projects"
        :key="code"
        :title="name"
        :isDisabled="!!currentPushing"
        :isActive="linkedProjects.some((project) => project === code)"
        :isLoading="currentPushing === code"
        :onClick="() => handleItemLink(code)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";

import ProjectTile from "@/components/ProjectTile.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";

const projects = [
  { name: "Cover Tool", code: "COVER_TOOL" },
  { name: "Project Wizard", code: "PROJECT_WIZARD" },
  { name: "Lulu Website", code: "LULU_WEBSITE" },
  { name: "Lulu Direct UI", code: "LULU_DIRECT_UI" },
];

const store = useStore();
const currentPushing = computed(() => store.state.currentPushing);
const lastPushDate = computed(() => store.state.lastPushDate);
const linkedProjects = computed(() => store.state.linkedProjects);

const handleLuluFePush = async () => {
  store.dispatch("pushLuluFe");
};

const handleItemLink = async (code: string) => {
  if (linkedProjects.value.some((project) => project === code)) {
    store.dispatch("unlinkItem", code);
    return;
  }

  store.dispatch("linkItem", code);
};
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
  grid-column: 1 / 3;

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

.grid {
  margin-top: 8px;
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
