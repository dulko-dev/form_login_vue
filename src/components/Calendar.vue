<template>
  <div class="calendar">
    <div class="calendar__container">
      <div class="calendar__container--data">
        <div class="calendar__container--data--month">April</div>
        <div class="calendar__container--data--year">
          <pre>&lt;</pre>
          <p>2022</p>
          <pre>&gt;</pre>
        </div>
      </div>
      <div class="calendar__container--main">
        <div class="calendar__container--main--days">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>
        <div class="calendar__container--main--daysOfMonth">
          <div v-for="(item, index) in items" :key="index">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  name: "Calendar",
  setup() {
    const items = ref([]);
    function loadCalendar() {
      const fieldOfCalendar = document.querySelector(
        ".calendar__container--main--daysOfMonth"
      );
      const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

      const date = new Date();

      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      const daysCurrentMonth = new Date(year, month + 1, 0).getDate();
      const firstDayMonth = new Date(year, month, 1);

      const firstDayMonthString = firstDayMonth.toLocaleDateString("en-us", {
        weekday: "short",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });

      const emptyBlockDay = weekdays.indexOf(
        firstDayMonthString.split(", ")[0]
      );

      for (let x = 1; x <= emptyBlockDay + daysCurrentMonth; x++) {
        if (x > emptyBlockDay) {
          items.value.push(x - emptyBlockDay);
        } else {
          items.value.push("X");
        }
      }
    }

    onMounted(() => {
      loadCalendar();
    });

    return {
      items,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_calendar.scss";
</style>
