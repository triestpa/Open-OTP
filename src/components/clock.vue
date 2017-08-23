<template>
  <div class="clock">
    <div class="center-circle"></div>
    <div class="seconds-container">
      <div ref="secondsHand" class="seconds"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'clock',
    mounted() {
      this.initTime()
    },
    methods: {
      /*
       * Starts any clocks using the user's local time
       * From: cssanimation.rocks/clocks
       */
      initTime() {
        let date = new Date;
        let seconds = date.getSeconds();
        let angle = seconds * 12
        let elem = this.$refs.secondsHand
        elem.style.webkitTransform = `rotateZ(${angle}deg)`
        elem.style.transform = `rotateZ(${angle}deg)`
      }
    }
  }
</script>

<style lang="scss" scoped>
  /* Forked from cssanimation.rocks/clocks */

  .clock {
    border-radius: 50%;
    background: #EAEAEA url('../assets/clock.svg') no-repeat center;
    background-size: 95%;
    height: 100%;
    position: relative;
    width: 100%;
  }

  .center-circle {
    border-radius: 50%;
    width: 5%;
    height: 5%;
    background: #EAEAEA;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9;
  }

  .clock.simple:after {
    background: #EAEAEA;
    border-radius: 50%;
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 5%;
    height: 5%;
    z-index: 10;
  }

  .seconds-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .seconds {
    background: #EAEAEA;
    height: 45%;
    left: 49.5%;
    position: absolute;
    top: 14%;
    transform-origin: 50% 80%;
    width: 1%;
    z-index: 8;
  }

  @keyframes rotate {
    100% {
      transform: rotateZ(360deg);
    }
  }

  .seconds-container {
    animation: rotate 30s infinite linear;
  }
</style>