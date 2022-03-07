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
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
          <div>11</div>
          <div>12</div>
          <div>13</div>
          <div>14</div>
          <div>15</div>
          <div>16</div>
          <div>17</div>
          <div>18</div>
          <div>19</div>
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
