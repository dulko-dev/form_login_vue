<template>
  <div class="dashboard">
    <h1 v-if="user">Welcome {{ user.email }}</h1>
    <button @click="logOutButton">LogOut</button>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Dashboard",
  setup() {
    const router = useRouter();
    const store = useStore();
    async function logOutButton() {
      try {
        await store.dispatch("logout");
        store.commit("changeLogin", false);
        router.replace("/");
      } catch (err) {
        store.commit("changeLogOutErr", "ooops you can't logout");
      }
    }

    return {
      logOutButton,
      error: computed(() => store.state.error.errorLogOut),
      user: computed(() => store.state.user),
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_dasboard.scss";
</style>
