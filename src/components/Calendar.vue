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
        <div class="calendar__container--main--daysOfMonth"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
export default {
  name: "Calendar",
  setup() {
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
        const daySquare = document.createElement("div");

        if (x > emptyBlockDay) {
          daySquare.innerHTML = x - emptyBlockDay;
        }

        fieldOfCalendar.appendChild(daySquare);
      }
    }

    onMounted(() => {
      loadCalendar();
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_calendar.scss";
</style>
