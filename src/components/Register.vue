<template>
  <form class="register" @submit.prevent="send">
    <h3 class="register__title" @click="openLogin = false">Sign up</h3>
    <div class="register__container">
      <label for="userName"></label>
      <input
        type="text"
        id="userName"
        placeholder="User name"
        v-model="username"
        ref="inputRef"
      />
      <label for="emailRegister"></label>
      <input
        type="text"
        id="emailRegister"
        placeholder="Email"
        v-model="email"
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
import { ref, reactive, toRefs, onMounted, inject, watch } from "vue";
export default {
  name: "Register",
  setup() {
    const inputRef = ref(null);
    const openLogin = inject("changeLogin");
    let btnAccept = ref(false);
    let eye = ref(true);

    const formState = reactive({
      username: "",
      email: "",
      password: "",
    });

    onMounted(() => {
      inputRef.value.focus();
    });

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

    function send() {
      formState.username = "";
      formState.email = "";
      formState.password = "";
    }

    return {
      send,
      inputRef,
      openLogin,
      btnAccept,
      eye,
      changeEye,
      ...toRefs(formState),
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_register.scss";
</style>
