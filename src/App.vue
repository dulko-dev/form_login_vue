<template>
  <section class="main">
    <div class="main__content">
      <div class="main__register">
        <Register />
      </div>
      <div class="main__login">
        <Login />
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
  background-color: $background-app;
  &__content {
    position: relative;
    margin: auto 10px;
    width: 350px;
    max-width: 100%;
    height: 500px;
    background: $background-form;
    &__register {
      height: 100%;
    }
    &__login {

      position: absolute;
      bottom:-100px;
      left:0;
    }
  }
}
</style>
