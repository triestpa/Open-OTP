<template>
  <section class="mui-panel otp-card">
    <h3>{{ name }}</h3>
    <div class="qr-container">
      <qr-code class="qrcode" :content="qrContent"></qr-code>
    </div>
    <div class="content">
      <div class="seed-input-textfield mui-textfield">
        <input type="text" v-model="pendingSecret">
        <label>OTP Seed Value</label>
      </div>
      <div>
        <button class="mui-btn mui-btn--primary" v-on:click="setSecret(pendingSecret)">Set Secret</button>
        <button class="mui-btn mui-btn--primary" v-on:click="setSecret(secret)">Reset</button>
        <button class="mui-btn mui-btn--primary" v-on:click="randomizeSecret()">Random</button>
      </div>
      <h1>OTP: {{ otp }}</h1>
      <small>Time Remaining: {{ time }}</small>
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
      pendingSecret: null
    }
  },

  created () {
    // Use var for these variables, since we want them in the global scope.
    //let newSecret = OTP.getRandomInt(0, Math.pow(10, 12))

    this.pendingSecret = this.secret

    // Show default generated secret value in UI
    this.setSecret(this.secret)

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
        this.pendingSecret = newSecret
        this.setQRCode()
      } catch (err) {
        console.error(err.message)
      }
    }
  }
}

</script>

<style lang="scss" scoped>

.seed-input-textfield {
  margin: 12px;
}

.qr-container {
  text-align: center;
}

.qrcode {
  padding: 12px;
}

</style>