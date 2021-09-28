import axios from "axios";

const state = {
  token: null,
  loading: false,
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  LOGING_PENDING(state) {
    state.loading = true;
  },
  LOGING_SUCCESS(state) {
    state.loading = false;
  },
};

const actions = {
  login({ commit }) {
    commit("LOGIN_PENDING");
    return axios.post("/api/login").then((response) => {
      localStorage.setItem("token", response.data.token);
      commit("SET_TOKEN", response.data.token);
      commit("LOGING_SUCCESS");
    });
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      localStorage.removeItem("token");
      commit("SET_TOKEN", null);
      resolve();
    });
  },
};

const getters = {
  token: (state) => state.token,
  loading: (state) => state.loading,
};

const loginModule = {
  state,
  mutations,
  actions,
  getters,
};

export default loginModule;
