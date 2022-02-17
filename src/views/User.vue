<template v-if="authisReady">
  <div class="user">
    <h1 v-if="user">Welcome {{ user.email }}</h1>
    <!-- <h1>Welcome {{ guest.email }}</h1> -->
    <button @click="logOutButton">LogOut</button>
  </div>
  <div v-if="error">{{ error }}</div>
</template>

<script>
import { ref, computed } from "vue";
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
        store.commit("changeLogin", false);
        router.replace("/");
      } catch (err) {
        error.value = error;
      }
    }

    return {
      error,
      logOutButton,
      user: computed(() => store.state.user),
      guest: computed(() => store.state.guest),
      authisReady: computed(() => store.state.defaultLogin),
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_user.scss";
</style>
