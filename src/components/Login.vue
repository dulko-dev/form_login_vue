<template>
  <form class="login" @submit.prevent="send">
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
    </div>
  </form>
</template>

<script>
import { ref, reactive, toRefs, inject, watch } from "vue";

export default {
  name: "Login",
  setup() {
    const formState = reactive({
      email: "",
      password: "",
    });
    const openLogin = inject("changeLogin");
    let btnAccept = ref(false);
    let eye = ref(true);
    let error = ref("");

    function send() {
      console.log(formState);

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
      send,
      openLogin,
      btnAccept,
      changeEye,
      eye,
      ...toRefs(formState),
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_login.scss";
</style>
