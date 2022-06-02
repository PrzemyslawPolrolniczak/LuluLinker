import { createStore } from "vuex";
import { invoke } from "@tauri-apps/api/tauri";
import { readTextFile, Dir, writeFile } from "@tauri-apps/api/fs";

export type Project =
  | "LULU_FE"
  | "PROJECT_WIZARD"
  | "COVER_TOOL"
  | "LULU_DIRECT_UI"
  | "LULU_WEBSITE";

interface State {
  currentPushing: Project | null;
  lastPushDate: string | null;
  disableActions: boolean;
  linkedProjects: Omit<Project, "LULU_FE">[];
}

const readConfig = async () => {
  const configFileContent = await readTextFile("lulu-linker-config.json", {
    dir: Dir.Config,
  });

  return JSON.parse(configFileContent);
};

const writeConfig = async (config: any) => {
  const parsedConfig = await readConfig();
  const newConfig = { ...parsedConfig, ...config };

  await writeFile(
    {
      path: "lulu-linker-config.json",
      contents: JSON.stringify(newConfig),
    },
    { dir: Dir.Config }
  );
};

export default createStore<State>({
  state: {
    currentPushing: null,
    lastPushDate: null,
    disableActions: false,
    linkedProjects: ["PROJECT_WIZARD"],
  },
  getters: {},
  mutations: {
    setCurrentPushing: (state, payload) => {
      state.currentPushing = payload;
    },
    disableActions: (state, payload) => {
      state.disableActions = payload;
    },
    setLastPushDate: (state, payload) => {
      state.lastPushDate = payload;
    },
    changeLinkedProjects: (state, { code, type }) => {
      if (type === "RESTORE") {
        state.linkedProjects = code;
        return;
      }

      const newLinkedProjects =
        type === "ADD"
          ? [...state.linkedProjects, code]
          : state.linkedProjects.filter((project) => project !== code);

      state.linkedProjects = newLinkedProjects;
    },
  },
  actions: {
    pushLuluFe: async ({ commit, state }) => {
      commit("disableActions", true);
      commit("setCurrentPushing", "LULU_FE");

      const config = await readConfig();

      const res = await invoke("push_lulu_fe", {
        luluFePath: config.paths.LULU_FE,
      });

      console.log(res);

      commit("disableActions", false);
      commit("setCurrentPushing", null);
      commit("setLastPushDate", new Date().toLocaleString("pl-PL"));

      await writeConfig({
        lastPushDate: state.lastPushDate,
      });
    },
    linkItem: async ({ commit, state }, code) => {
      commit("disableActions", true);
      commit("setCurrentPushing", code);

      const config = await readConfig();

      const res = await invoke("link_project", {
        projectPath: config.paths[code],
      });

      console.log(res);

      commit("changeLinkedProjects", { code, type: "ADD" });

      await writeConfig({
        linkedProjects: state.linkedProjects,
      });

      commit("disableActions", false);
      commit("setCurrentPushing", null);
    },
    unlinkItem: async ({ commit, state }, code) => {
      commit("disableActions", true);
      commit("setCurrentPushing", code);

      const config = await readConfig();

      const res = await invoke("unlink_project", {
        projectPath: config.paths[code],
      });

      console.log(res);

      commit("changeLinkedProjects", { code });

      await writeConfig({
        linkedProjects: state.linkedProjects,
      });

      commit("disableActions", false);
      commit("setCurrentPushing", null);
    },
    getStateFromConfig: async ({ commit }) => {
      const config = await readConfig();

      commit("changeLinkedProjects", {
        code: config.linkedProjects || [],
        type: "RESTORE",
      });
      commit("setLastPushDate", config.lastPushDate || null);
    },
  },
  modules: {},
});
