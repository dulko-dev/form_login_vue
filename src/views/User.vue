<template>
  <div class="user">
    <h1>Welcome</h1>
    <button @click="logOutButton">LogOut</button>
  </div>
  <div v-if="error">{{ error }}</div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "User",
  setup() {
    const router = useRouter();
    const store = useStore();
    let error = ref(null);

    async function logOutButton() {
      try {
        store.dispatch("logout");
        router.replace("/");
      } catch (err) {
        error.value = error;
      }
    }

    return {
      error,
      logOutButton,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_user.scss";
</style>
