<template>
  <form class="register" @submit.prevent="signupUser">
    <h3 class="register__title" @click="openLogin = false">Sign up</h3>
    <div class="register__container">
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
  <div v-if="error">{{ error }}</div>
</template>

<script>
import { ref, reactive, toRefs, inject, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Register",
  setup() {
    const inputRef = ref(null);
    const openLogin = inject("FormLogin", false);
    let btnAccept = ref(false);
    let eye = ref(true);
    let error = ref(null);
    const store = useStore();
    const router = useRouter();

    const formState = reactive({
      username: "",
      email: "",
      password: "",
    });

    // onMounted(() => {
    //   inputRef.value.focus();
    // });

    function changeEye(e) {
      eye.value = !eye.value;
      if (eye.value) {
        e.target.closest("label").nextElementSibling.type = "password";
      } else {
        e.target.closest("label").nextElementSibling.type = "text";
      }
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
        await store.dispatch;
        router.replace("/user");
      } catch (err) {
        error.value = error;
      }

      formState.username = "";
      formState.email = "";
      formState.password = "";
    }

    return {
      signupUser,
      inputRef,
      openLogin,
      btnAccept,
      eye,
      changeEye,
      error,
      ...toRefs(formState),
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_register.scss";
</style>
