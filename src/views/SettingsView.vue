<template>
  <div class="settings">
    <h1>Settings</h1>
    <label>
      <input type="checkbox" v-model="state.settings.isYalcAvailable">
      Use Yalc instead of npm link
    </label>

    <label>
      Project wizard path:
      <br>
      <input type="text" v-model="state.settings.paths.projectWizard" />
    </label>

    <label>
      @Lulu/fe path:
      <br>
      <input type="text" v-model="state.settings.paths.luluFe" />
    </label>

    <label>
      Lulu website path:
      <br>
      <input type="text" v-model="state.settings.paths.luluWebsite" />
    </label>

    <button @click="handleSettingsSave">Save settings</button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { readTextFile, Dir, writeFile } from '@tauri-apps/api/fs'

const defaultSettings = {
  isYalcAvailable: false,
  paths: {
    projectWizard: '',
    luluWebsite: '',
    luluFe: ''
  }
}
const state = reactive({
  settings: defaultSettings,
})

onMounted(async () => {
  const configFileContent = await readTextFile("lulu-helper-config.json", { dir: Dir.Download });
  const parsedConfig = JSON.parse(configFileContent)

  state.settings = parsedConfig;
})

const handleSettingsSave = async () => {
  await writeFile({ path: 'lulu-helper-config.json', contents: JSON.stringify(state.settings) }, { dir: Dir.Download });
}
</script>

<style lang="scss">
label {
  display: block;
  margin: 1rem;
}
</style>
