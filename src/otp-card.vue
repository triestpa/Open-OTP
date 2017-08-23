<template>
  <section class="mui-panel otp-card">
    <h3>{{ name }}</h3>
    <div class="content">
      <div>
        <div class="qr-container">
          <qr-code class="qrcode" :content="qrContent"></qr-code>
        </div>
        <div class="primary-card-content">
          <div class="clock-container">
            <clock></clock>
          </div>
          <h1>OTP: {{ otp }}</h1>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import OTP from 'tiny-otp'
import qrCode from './qr-code.vue'
import clock from './clock.vue'

export default {
  name: 'otp-card',
  components: { qrCode, clock },
  props: {
    name: String,
    secret: String
  },
  data () {
    return {
      time: null,
      otp: null,
      generator: null,
      qrContent: null,
    }
  },

  created () {
    // Show default generated secret value in UI
    this.generator = new OTP(this.secret)
    const secretb32 =  this.generator.getBase32Secret()
    this.qrContent = `otpauth://totp/${name}?secret=${secretb32}`
    this.time = new Date().toLocaleString()
    this.otp = this.generator.getTOTP()
  },

  mounted () {
   setInterval(() => {
        // Update time and value every second
        this.time = 30 - (new Date().getSeconds() % 30)
        this.otp = this.generator.getTOTP()
    }, 120)
  },

  methods: {

  }
}

</script>

<style lang="scss" scoped>

.clock-container {
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

.qr-container {
  text-align: center;
}

.qrcode {
  padding: 12px;
}

</style>