<template>
  <section class="main">
    <div class="main__content">
      <div class="main__register">
        <Register />
      </div>
      <div
        class="main__login"
        :class="openLogin ? 'openWindow' : 'closeWindow'"
      >
        <Login />
      </div>
    </div>
  </section>
</template>

<script>
import { ref, provide } from "vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
export default {
  name: "App",
  components: {
    Login,
    Register,
  },
  setup() {
    const openLogin = ref(true);
    provide("changeLogin", openLogin);

    return {
      openLogin,
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background: #0f0c29;
  background: -webkit-linear-gradient(to left, #24243e, #302b63, #0f0c29);
  background: linear-gradient(to left, #24243e, #302b63, #0f0c29);
  &__content {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;
    border-radius: 7px;
    position: relative;
    margin: auto 10px;
    width: 350px;
    max-width: 100%;
    height: 500px;
    overflow: hidden;
    .main__register {
      height: 100%;
      background-image: url(#{$bg-register}/bg-register.jpg);
      background-repeat: no-repeat;
      background-size: cover;
    }
    .main__login {
      background: $fontColor-title;
      height: 100%;
      border-radius: 50%/10%;
      position: absolute;
    }
    .openWindow {
      transition: top 1s;
      width: 100%;
      top: 25%;
    }
    .closeWindow {
      transition: top 1s;
      width: 100%;
      top: 75%;
    }
  }
}
</style>
