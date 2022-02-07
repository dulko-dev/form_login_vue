<template>
  <section class="main">
    <div class="main__content">
      <div class="main__register">
        <Register />
      </div>
      <div class="main__login">
        <Login v-show="false" />
      </div>
    </div>
  </section>
</template>

<script>
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
export default {
  name: "App",
  components: {
    Login,
    Register,
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100vh;
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
    background-image: url(#{$bg-register}/bg-register.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    .main__register {
      height: 100%;
    }
    .main__login {
      height: 100%;
      position: absolute;
      bottom: -75%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
