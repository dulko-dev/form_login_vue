<template>
  <form class="login" @submit.prevent="send">
    <h3 class="login__title" @click="openLogin = true">Login</h3>
    <div class="login__container">
      <label for="email"></label>
      <input type="text" id="email" placeholder="Email" v-model="email" />
      <label for="password"></label>
      <input
        type="text"
        id="password"
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
import {ref, reactive, toRefs, inject, watch } from "vue";
export default {
  name: "Login",
  setup() {
    const formState = reactive({
      email: "",
      password: "",
    });
    const openLogin = inject("changeLogin");
    let btnAccept = ref(false);
    function send() {
      console.log(formState);
      formState.email = "";
      formState.password = "";
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
      ...toRefs(formState),
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 20% 50%;
  justify-content: center;
  &__title {
    color: $bg-button;
    cursor: pointer;
    font-size: 1.2em;
    grid-row: 1/2;
    align-self: start;
    justify-self: center;
    font-weight: 600;
    margin-top: 10px;
    @media (min-width: 150px) {
      font-size: 2.5em;
    }
  }
  &__container {
    display: flex;
    grid-row: 2/3;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    input {
      padding: 10px 5px;
      margin-top: 20px;
      border-radius: 5px;
      width: 100%;
      background: #dddddd;
      border: 0;
    }
    input[type="submit"] {
      width: 90%;
      background-color: $bg-button;
      color: $fontColor-title;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .btnOpen {
    pointer-events: all;
    opacity: 1;
  }
  .btnClose {
    pointer-events: none;
    opacity: 0.5;
  }
}
</style>
