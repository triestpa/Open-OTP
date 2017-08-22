<template>
  <section class="mui-panel otp-card">
    <div class="content">
      <div>
        <div class="seed-input-textfield mui-textfield">
          <input type="text" v-model="newSecret">
          <label>OTP Seed Value</label>
        </div>
        <div>
          <button class="mui-btn mui-btn--primary" v-on:click="emitNewOTP(newSecret)">Set Secret</button>
          <button class="mui-btn mui-btn--primary" v-on:click="randomizeSecret()">Random</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import OTP from 'tiny-otp'
import qrCode from './qr-code.vue'
import progressCircle from './progress-circle.vue'

export default {
  name: 'otp-create-card',
  data () {
    return {
      newSecret: null
    }
  },
  methods: {
    randomizeSecret () {
      this.newSecret = OTP.getRandomInt(0, Math.pow(10, 12))
    },
    emitNewOTP () {
      // Emit the number value through the input event
      this.$emit('newOTP', this.newSecret)
      this.newSecret = OTP.getRandomInt(0, Math.pow(10, 12))
    }
  }
}
</script>

<style lang="scss" scoped>

.seed-input-textfield {
  margin: 12px;
}

</style>