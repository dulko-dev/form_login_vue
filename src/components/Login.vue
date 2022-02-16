<template>
  <form class="login" @submit.prevent="loginUser">
    <h3 class="login__title" @click="openLogin = true">Login</h3>
    <div class="login__container">
      <label for="emailLogin"></label>
      <input type="text" id="emailLogin" placeholder="Email" v-model="email" />
      <label for="passwordLogin">
        <div class="image_container" @click="changeEye($event)">
          <img v-if="eye" src="../assets/hidden.png" />
          <img v-else src="../assets/view.png" />
        </div>
      </label>
      <input
        type="password"
        id="passwordLogin"
        placeholder="Password"
        v-model="password"
      />
      <input
        type="submit"
        value="Login"
        :class="btnAccept ? 'btnOpen' : 'btnClose'"
      />
      <input value="Login as Guest" type="button" @click="loginGuest" />
    </div>
  </form>
  <div v-if="error">{{ error }}</div>
</template>

<script>
import { ref, reactive, toRefs, inject, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  setup() {
    let btnAccept = ref(false);
    let eye = ref(true);
    const error = ref(null);
    const formState = reactive({
      email: "",
      password: "",
    });
    const router = useRouter();
    const store = useStore();
    const openLogin = inject("changeLogin");

    async function loginGuest() {
      try {
        store.commit("loginGuest");
        store.commit("changeLogin", true);
        router.replace("/user");
      } catch (err) {
        error.value = err.message;
      }
    }

    async function loginUser() {
      try {
        store.dispatch("login", {
          email: formState.email,
          password: formState.password,
        });

        router.replace("/user");
      } catch (err) {
        error.value = err.message;
      }

      formState.email = "";
      formState.password = "";
    }

    function changeEye(e) {
      eye.value = !eye.value;
      if (eye.value) {
        e.target.closest("label").nextElementSibling.type = "password";
      } else {
        e.target.closest("label").nextElementSibling.type = "text";
      }
    }

    watch(
      () => ({ ...formState }),
      (val) => {
        if (val.email !== "" && val.password !== "") {
          btnAccept.value = true;
        } else {
          btnAccept.value = false;
        }
      }
    );

    return {
      loginUser,
      openLogin,
      btnAccept,
      changeEye,
      eye,
      loginGuest,
      error,
      ...toRefs(formState),
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_login.scss";
</style>
