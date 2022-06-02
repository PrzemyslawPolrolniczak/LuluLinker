<template>
  <div class="settings">
    <h1>Settings</h1>
    <label>
      <input
        type="checkbox"
        v-model="state.settings.isYalcAvailable"
        disabled
      />
      Use Yalc instead of npm link
    </label>

    <label>
      Project wizard path:
      <br />
      <input type="text" v-model="state.settings.paths.PROJECT_WIZARD" />
    </label>

    <label>
      @Lulu/fe path:
      <br />
      <input type="text" v-model="state.settings.paths.LULU_FE" />
    </label>

    <label>
      Lulu website path:
      <br />
      <input type="text" v-model="state.settings.paths.LULU_WEBSITE" />
    </label>

    <label>
      Cover Tool path:
      <br />
      <input type="text" v-model="state.settings.paths.COVER_TOOL" />
    </label>

    <label>
      Lulu Direct UI path:
      <br />
      <input type="text" v-model="state.settings.paths.LULU_DIRECT_UI" />
    </label>

    <button @click="handleSettingsSave">Save settings</button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { readTextFile, Dir, writeFile } from "@tauri-apps/api/fs";

const defaultSettings = {
  isYalcAvailable: true,
  paths: {
    PROJECT_WIZARD: "",
    LULU_WEBSITE: "",
    LULU_FE: "",
    COVER_TOOL: "",
    LULU_DIRECT_UI: "",
  },
  linkedProjects: [],
};
const state = reactive({
  settings: defaultSettings,
});

onMounted(async () => {
  const configFileContent = await readTextFile("lulu-linker-config.json", {
    dir: Dir.Config,
  });
  const parsedConfig = JSON.parse(configFileContent);

  state.settings = parsedConfig;
});

const handleSettingsSave = async () => {
  await writeFile(
    {
      path: "lulu-linker-config.json",
      contents: JSON.stringify(state.settings),
    },
    { dir: Dir.Config }
  );
};
</script>

<style lang="scss">
label {
  display: block;
  margin: 1rem;
}
</style>
