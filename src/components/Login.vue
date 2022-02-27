<template>
  <form class="login" @submit.prevent="loginUser">
    <h3
      data-testid="title-login"
      class="login__title"
      @click="[(openLogin = true), focusLogin()]"
    >
      Login
    </h3>
    <div class="login__container">
      <label for="emailLogin"></label>
      <input
        type="text"
        id="emailLogin"
        placeholder="Email"
        v-model="email"
        ref="inputLogin"
      />
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
    <p class="errorLogin" v-if="error">{{ error }}</p>
  </form>
</template>

<script>
import { ref, reactive, toRefs, inject, watch, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  setup() {
    let inputLogin = ref(null);
    let btnAccept = ref(false);
    let eye = ref(true);
    const formState = reactive({
      email: "",
      password: "",
    });
    const router = useRouter();
    const store = useStore();
    const openLogin = inject("FormLogin");

    onMounted(() => {
      inputLogin.value.focus();
    });

    function focusLogin() {
      store.commit("changeRegisterErr", "");
    }

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
        await store.dispatch("login", {
          email: formState.email,
          password: formState.password,
        });
        router.replace("/user");
      } catch (err) {
        store.commit("changeLoginErr", "email or password is invalid");
        console.log(err.message);
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
      error: computed(() => store.state.errorLogin),
      inputLogin,
      focusLogin,
      ...toRefs(formState),
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_login.scss";
</style>
