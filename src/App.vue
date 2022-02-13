<template>
  <router-view />
</template>

<script>
import { initializeApp } from "firebase/app";
import { config } from "./firebase/config.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "App",

  setup() {
    const router = useRouter();
    onBeforeMount(() => {
      initializeApp(config.firebaseConfig);
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.replace("/");
        } else {
          router.replace("/user");
        }
      });
    });
  },
};
</script>
