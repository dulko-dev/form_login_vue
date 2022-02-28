<template v-if="authisReady">
  <div class="user">
    <div class="user__board">
      <div class="user__board__dashboardSquare">
        <Dashboard />
      </div>
      <div class="user__board__clockSquare">
        <Clock />
      </div>
      <div class="user__board__calendarSquare">
        <Calendar />
      </div>
      <div class="user__board__todoSquare">
        <Todo />
      </div>
    </div>
  </div>
</template>

<script>
import Dashboard from "../components/Dasboard.vue";
import Clock from "../components/Clock.vue";
import Calendar from "../components/Calendar.vue";
import Todo from "../components/Todo.vue";

import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "User",
  components: {
    Clock,
    Dashboard,
    Calendar,
    Todo,
  },
  setup() {
    const store = useStore();
    return {
      authisReady: computed(() => store.state.defaultLogin),
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_user.scss";
</style>
