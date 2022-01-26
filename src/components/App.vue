<template>
  <div class="container">
    <h1>{{ age }}</h1>
    <div>App</div>
    <b-button variant="primary">Primary</b-button>
    <child></child>
  </div>
</template>

<script>
import Branch from "./Branch.vue";
export default {
  components: {
    child: Branch,
  },
  data() {
    return {
      sayMyName: "Kamil",
      age: 'Dulko',
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
