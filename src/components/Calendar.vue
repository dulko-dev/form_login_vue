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
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div class="calendar__container--main--daysOfMonth">
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calendar",
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_calendar.scss";
</style>
