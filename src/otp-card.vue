<template>
  <section class="mui-panel otp-card">
    <h3>{{ name }}</h3>
    <div class="content">
      <div v-if="!secret">
        <div class="seed-input-textfield mui-textfield">
          <input type="text" v-model="pendingSecret">
          <label>OTP Seed Value</label>
        </div>
        <div>
          <button class="mui-btn mui-btn--primary" v-on:click="setSecret(pendingSecret)">Set Secret</button>
          <button class="mui-btn mui-btn--primary" v-on:click="randomizeSecret()">Random</button>
        </div>
      </div>
      <div v-else>
        <div v-if="showSecretContent" class="edit-card-content">
          <div class="qr-container">
            <qr-code class="qrcode" :content="qrContent"></qr-code>
          </div>
          <div class="seed-input-textfield mui-textfield">
            <input type="text" v-model="pendingSecret">
            <label>OTP Seed Value</label>
          </div>
        </div>
        <div v-else class="primary-card-content">
          <progress-circle interval="30"></progress-circle>
          <h1>OTP: {{ otp }}</h1>
        </div>
        <button class="mui-btn mui-btn--primary" v-on:click="setSecret(null)">Clear</button>
        <button class="mui-btn mui-btn--primary" v-on:click="toggleSecretContent()">Show Secret</button>
      </div>
    </div>
  </section>
</template>

<script>
import OTP from 'tiny-otp'
import qrCode from './qr-code.vue'
import progressCircle from './progress-circle.vue'

export default {
  name: 'otp-card',
  components: { qrCode, progressCircle },
  props: {
    name: String,
    secret: String
  },
  data () {
    return {
      showSecretContent: false,
      secret: null,
      time: null,
      otp: null,
      generator: null,
      qrContent: null,
      pendingSecret: null
    }
  },

  created () {
    // Set the pending(displayed) secret as the provided secret
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
    toggleSecretContent () {
      this.showSecretContent = !this.showSecretContent
    },

    randomizeSecret () {
      let newSecret = OTP.getRandomInt(0, Math.pow(10, 12))
      this.setSecret(newSecret)
    },

    setQRCode (label = 'test') {
      let secretb32 =  this.generator.getBase32Secret()
      this.qrContent = `otpauth://totp/${label}?secret=${secretb32}`
    },

    setSecret (newSecret) {
      if (!newSecret) {
        this.secret = null
      } else {
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