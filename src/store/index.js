import { createStore } from "vuex";
import auth from "../firebase/config.js";
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
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      console.log("user state: ", state.user);
    },
    loginGuest(state) {
      signInWithEmailAndPassword(auth, state.guest.email, state.guest.password);
    },
    changeLogin(state, payload) {
      state.defaultLogin = payload;
    },
  },
  actions: {
    async signup(context, { email, password, userName }) {
      console.log("signup in action");

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
      console.log("login in action");

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
  store.commit('changeLogin', true);
  store.commit("setUser", user);
  if (user) {
    router.push({ name: "User" });
  }
  unsub();
});

export default store;
