<template>
  <div>
    <p>Time clicked:{{ count }}</p>
    <button @click="add">add</button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "App",
  setup() {
    const count = ref(0);

    const add = () => {
      count.value++;
    };

    return {
      count,
      add,
    };
  },
};
</script>

<style lang="scss">
div {
  width: 100%;
  height: 100vh;
  background: grey;
  color: white;
}
</style>
