import { createApp } from "vue";
import App from "./App.vue";
import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      success: false,
      msg: "",
      json: [],
      cells: [],
      response: [],
    };
  },
  mutations: {
    init(state) {
      state = {
        success: false,
        msg: "",
        json: [],
        cells: [],
        response: [],
      };
    },
    reset(state) {
      state.cells.forEach((item, index) => {
        if (!item.disabled) {
          state.cells[index].isActive = false;
          state.cells[index].value = 0;
        }
      });
    },
    constructResponse(state) {
      state.response = [];

      for (let i = 0; i < 9; i++) {
        state.response[i] = [];
      }

      state.cells.forEach((item, index) => {
        state.response[item.row - 1].push(parseInt(item.value));
      });
    },
    clearHighlight(state) {
      state.cells.forEach((item, index) => {
        state.cells[index].isActive = false;
      });
    },
  },
});

const application = createApp(App);
application.use(store);
application.mount("#app");
