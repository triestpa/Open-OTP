<template>
  <section class="otp-card">
    <p>{{ name }}</p>
    <qr-code class="qrcode" :content="qrContent"></qr-code>
    <div class="content">
      <input type="text" v-model="pendingSecret">
      <div>
        <a type="button" class="button" v-on:click="setSecret(pendingSecret)">Set OTP</a>
        <a type="button" class="button" v-on:click="setSecret(secret)">Reset</a>
        <a type="button" class="button" v-on:click="randomizeSecret()">Random</a>
      </div>
      <h1>{{ otp }}</h1>
      <small>{{ time }}</small>
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
        this.time = new Date().toLocaleString()
        this.otp = this.generator.getTOTP()
    }, 700)
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

input {
  margin: 12px;
}

.otp-card {
  padding: 24px;
  border: 1px solid black;
  border-radius: 6px;
  text-align: center;
  margin: 24px;
}

.qrcode {
  padding: 12px;
}

.button {
  padding: 12px;
  cursor: pointer;
  user-select: none;
}

</style>