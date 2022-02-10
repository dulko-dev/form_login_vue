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

    const formState = reactive({
      username: "",
      email: "",
      password: "",
    });

    onMounted(() => {
      inputRef.value.focus();
    });

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
      ...toRefs(formState),
    };
  },
};
</script>

<style lang="scss" scoped>
.register {
  height: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 20% 80%;
  justify-content: center;
  &__title {
    cursor: pointer;
    font-size: 1.2em;
    grid-row: 1/2;
    align-self: end;
    justify-self: center;
    color: $fontColor-title;
    font-weight: 600;
    @media (min-width: 150px) {
      font-size: 2.5em;
    }
  }
  &__container {
    display: flex;
    grid-row: 2/3;
    flex-direction: column;
    justify-content: flex-start;
    margin: 20px 5px;
    align-items: center;
    input {
      padding: 10px 5px;
      border-radius: 5px;
      width: 100%;
      border: 0;
      margin-top: 20px;
      &:nth-child(2) {
        margin-top: 35px;
      }
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
  .modal {
    background: red;
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
