<template>
  <form class="login" @submit.prevent="send">
    <h3 class="login__title">Login</h3>
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
      <input type="submit" value="Login" />
    </div>
  </form>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  name: "Login",
  setup() {
    const formState = reactive({
      email: "",
      password: "",
    });

    function send() {
      console.log(formState);
      formState.email = "";
      formState.password = "";
    }

    return {
      send,
      ...toRefs(formState),
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  width:100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 25% 50% 25%;
  justify-content: center;
  &__title {
    font-size: 1.2em;
    grid-row: 1/2;
    align-self: center;
    justify-self: center;
    color: $fontColor-title;
    @media (min-width: 150px) {
      font-size: 2em;
    }
  }
  &__container {
    display: flex;
    grid-row: 2/3;
    flex-direction: column;
    justify-content: space-between;
    margin: 20px 5px;
    align-items: center;
    input {
      padding: 10px 5px;
      border-radius: 5px;
      width: 100%;
    }
    input[type="button"] {
      width: 90%;
    }
  }
}
</style>
