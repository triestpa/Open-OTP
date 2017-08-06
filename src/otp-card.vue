<template>
  <section class="otp-card">
    <p>{{ name }}</p>
    <p>{{ secret }}</p>
    <qr-code :content="qrContent"></qr-code>
    <div class="content">
      <h1>{{ otp }}</h1>
      <small>{{ time }}</small>
      <h3 id="error"></h3>
      <progress class="progress is-info" value="45" max="100">45%</progress>
    </div>
  </section>
</template>

<script>
import OTP from 'tiny-otp'
import qrCode from './qr-code.vue'

export default {
  name: 'otp-card',
  components: { qrCode },
  props: {
    name: String,
    secret: String
  },
  data () {
    return {
      secret: null,
      time: null,
      otp: null,
      generator: null,
      qrContent: null,
    }
  },

  created () {
    // Use var for these variables, since we want them in the global scope.
    //let newSecret = OTP.getRandomInt(0, Math.pow(10, 12))

    // Show default generated secret value in UI
    this.setSecret(this.secret)

    this.time = new Date().toLocaleString()
    this.otp = this.generator.getTOTP()
  },

  mounted () {
   setInterval(() => {
        // Update time and value every second
        this.time = new Date().toLocaleString()
        this.otp = this.generator.getTOTP()
    }, 1000)
  },

  methods: {
    randomizeSecret () {
      let newSecret = OTP.getRandomInt(0, Math.pow(10, 12))
      this.setSecret(newSecret)
    },

    setQRCode (label = 'test') {
      let secretb32 =  this.generator.getBase32Secret()
      this.qrContent = `otpauth://totp/${label}?secret=${secretb32}`
    },

    setSecret (newSecret) {
      newSecret = String(newSecret)

      try {
        this.generator = new OTP(newSecret)
        this.secret = newSecret
        this.setQRCode()
      } catch (err) {
        console.error(err.message)
      }
    }
  }
}

</script>

<style lang="scss" scoped>

.otp-card {
  padding: 24px;
  border: 1px solid black;
  border-radius: 5px;
  text-align: center;
  margin: 24px;
}

</style>