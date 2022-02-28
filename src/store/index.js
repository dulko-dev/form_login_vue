import { createStore } from "vuex";
import { auth } from "../firebase/config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import router from "../router/index.js";

const store = createStore({
  state: {
    user: null,
    guest: {
      email: "admin@dev.com",
      password: "123456",
      username: "Admin",
    },
    defaultLogin: false,
    error : {
      errorLogOut:null,
    },
    errorRegister: null,
    errorLogin: null,
    errorDefLogin: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    changeLogin(state, payload) {
      state.defaultLogin = payload;
    },
    changeRegisterErr(state, payload) {
      state.errorRegister = payload;
    },
    changeLoginErr(state, payload) {
      state.errorLogin = payload;
    },
    changeDefLoginErr(state, payload) {
      state.errorDefLogin = payload;
    },
    changeLogOutErr(state,payload){
      state.error.errorLogOut = payload;
    }
  },
  actions: {
    async guestLogin(context, { email, password }) {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result) {
        context.commit('setUser', result.user);
      }
    },
    async signup(context, { email, password, userName }) {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (result) {
        context.commit("setUser", result.user);
      } else {
        throw new Error("something went wrong with register");
      }

      await updateProfile(auth.currentUser, {
        displayName: userName,
      });
    },
    async login(context, { email, password }) {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result) {
        context.commit("setUser", result.user);
      } else {
        throw new Error("something went wrong with login");
      }
    },
    async logout(context) {
      await signOut(auth);
      context.commit("setUser", null);
    },
  },
});

const unsub = onAuthStateChanged(auth, (user) => {
  store.commit("changeLogin", true);
  store.commit("setUser", user);
  if (user) {
    router.push({ name: "User" });
  }
  unsub();
});

export default store;
