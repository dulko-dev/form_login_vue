<template>
  <h1>Welcome User</h1>
  <button @click="logOutButton">LogOut</button>
</template>

<script>
import { ref } from "vue";
import auth from "../firebase/config";
import { signOut } from "firebase/auth";
export default {
  name: "User",

  setup() {
    let error = ref("");
    function logOutButton() {
      signOut(auth)
        .then(() => {
          this.$router.push({ name: "Form" });
        })
        .catch((err) => {
          error.value = err;
        });
    }

    return {
      logOutButton,
    };
  },
};
</script>

<style></style>
