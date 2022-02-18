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
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
export default {
  name: "Form",
  components: {
    Login,
    Register,
  },
  setup() {
    const openLogin = ref(true);
    provide("FormLogin", openLogin);

    return {
      openLogin,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_form.scss";
</style>
