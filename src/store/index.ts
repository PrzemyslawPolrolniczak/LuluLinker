import { createStore } from "vuex";

interface State {
  isLuluFePushing: boolean;
  lastPushDate: string | null;
}

export default createStore<State>({
  state: {
    isLuluFePushing: false,
    lastPushDate: null,
  },
  getters: {},
  mutations: {
    setIsLuluFePushing: (state) => {
      state.isLuluFePushing = true;
      state.lastPushDate = new Date().toLocaleString('pl-PL');
    }
  },
  actions: {},
  modules: {},
});
