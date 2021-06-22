import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    show_advancedMode: false,
    show_arduinoCode: false,
    show_stepNumber: false,
    current_file: { name: "Projeto novo", content: { blocks: {}, total: 0 } },
    arduino_code: "void setup( ){\n}\n \nvoid loop( ){\n}",
  },
  mutations: {
    switch_advancedMode: (state) =>
      (state.show_advancedMode = !state.show_advancedMode),
    switch_arduinoCode: (state) =>
      (state.show_arduinoCode = !state.show_arduinoCode),
    switch_stepNumber: (state) =>
      (state.show_stepNumber = !state.show_stepNumber),
    new_file: (state) =>
      (state.current_file = {
        name: "Projeto novo",
        content: { blocks: {}, total: 0 },
      }),
  },
  actions: {},
  modules: {},
});
