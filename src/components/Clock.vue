<template>
  <div class="clock">
    <div class="clock__face">
      <div class="clock__face--hours clock__face--digit">
        <div class="clock__face--hours--hand"></div>
        <div>12</div>
        <div>3</div>
        <div>6</div>
        <div>9</div>
      </div>
      <div class="clock__face--minutes"></div>
      <div class="clock__face--seconds"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Clock",
  setup() {
    (function setHands() {
      const intervTimeout = setInterval(() => {
        let hr = document.querySelector(".clock__face--hours--hand");
        let min = document.querySelector(".clock__face--minutes");
        let sec = document.querySelector(".clock__face--seconds");

        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        let hand_hr = hours * 30 + minutes / 2;
        let hand_min = minutes * 6 + seconds / 10;
        let hand_sec = seconds * 6;

        hr.style.transform = `rotate(${hand_hr}deg)`;
        min.style.transform = `rotate(${hand_min}deg)`;
        sec.style.transform = `rotate(${hand_sec}deg)`;
      }, 1000);
    })();
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_clock.scss";
</style>
