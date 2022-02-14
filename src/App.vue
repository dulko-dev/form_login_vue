<template>
  <router-view />
</template>

<script>
import auth from "./firebase/config.js";
import { onAuthStateChanged } from "firebase/auth";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "App",

  setup() {
    const router = useRouter();
    onBeforeMount(() => {
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
