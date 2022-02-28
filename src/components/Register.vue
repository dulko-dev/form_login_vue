<template>
  <form class="register" @submit.prevent="signupUser">
    <h3 class="register__title" @click="[(openLogin = false), focusInput()]">
      Sign up
    </h3>
    <div class="register__container">
      <div data-testid="error-register" class="errorRegister" v-if="error">
        {{ error }}
      </div>

      <label for="userName"></label>
      <input
        type="text"
        id="userName"
        placeholder="User name"
        v-model="username"
        ref="inputRef"
        required
      />
      <label for="emailRegister"></label>
      <input
        type="text"
        id="emailRegister"
        placeholder="Email"
        v-model="email"
        required
      />
      <label for="passwordRegister">
        <div class="image_container" @click="changeEye($event)">
          <img v-if="eye" src="../assets/hidden.png" />
          <img v-else src="../assets/view.png" />
        </div>
      </label>
      <input
        type="password"
        id="passwordRegister"
        placeholder="Password"
        v-model="password"
        required
      />

      <input
        type="submit"
        value="Sign up"
        :class="btnAccept ? '.btnOpen' : 'btnClose'"
      />
    </div>
  </form>
</template>

<script>
import { ref, reactive, toRefs, inject, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Register",
  setup() {
    const openLogin = inject("FormLogin");
    let btnAccept = ref(false);
    let eye = ref(true);
    const store = useStore();
    const router = useRouter();
    const inputRef = ref(null);

    const formState = reactive({
      username: "",
      email: "",
      password: "",
    });

    function changeEye(e) {
      eye.value = !eye.value;
      if (eye.value) {
        e.target.closest("label").nextElementSibling.type = "password";
      } else {
        e.target.closest("label").nextElementSibling.type = "text";
      }
    }

    function focusInput() {
      inputRef.value.focus();
      formState.username = "";
      formState.email = "";
      formState.password = "";
      store.commit("changeLoginErr", "");
    }

    watch(
      () => {
        return { ...formState };
      },
      (newVal) => {
        if (
          newVal.username !== "" &&
          newVal.email !== "" &&
          newVal.password !== ""
        ) {
          btnAccept.value = true;
        } else {
          btnAccept.value = false;
        }
      }
    );

    async function signupUser() {
      if (
        formState.username === "" ||
        formState.email === "" ||
        formState.password === ""
      )
        return;

      try {
        await store.dispatch("signup", {
          email: formState.email,
          password: formState.password,
          userName: formState.username,
        });
        router.replace("/user");
      } catch (err) {
        store.commit("changeRegisterErr", "");
      }
    }

    return {
      signupUser,
      openLogin,
      btnAccept,
      eye,
      changeEye,
      error: computed(() => store.state.errorRegister),
      inputRef,
      focusInput,
      ...toRefs(formState),
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_register.scss";
</style>
