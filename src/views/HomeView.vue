<template>
  <div class="home">
    <ProjectTile title="@lulu/fe" isMain />
    <div class="tile-grid">
      <ProjectTile title="Project Wizard" />
      <ProjectTile title="Lulu Website" />
      <ProjectTile title="Lulu Direct UI" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProjectTile from '@/components/ProjectTile.vue';
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
}

.tile-grid {
  margin-top: 8px;
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
