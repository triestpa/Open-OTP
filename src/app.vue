<template>
  <div id="app">
    <h1>Open OTP</h1>
    <p>An open-sourced, web-based, offline-first, time-based one-time-password generator.  The OTPs generated here are directly compatible with Google Authenticator.</p>
    <p>The app generates a new 6-digit OTP every 30 seconds, based on the shared secret value.</p>
    <p>The secret is also encoded bellow as a QR code.  Try scanning it with Google-Authenticator to verify that the generated OTPs are in sync.</p>

    <div class="otp-card-list">
      <div class="otp-card-container" v-for="(otp, index) in otps" :key="index">
        <otp-card :name="otp.name" :secret="otp.secret"></otp-card>
      </div>
    </div>
  </div>
</template>

<script>
import AES from 'crypto-js/aes'
import utf8 from 'crypto-js/enc-utf8';
import otpCard from './otp-card.vue'

export default {
  name: 'app',
  components: { otpCard },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      otps: []
    }
  },
  created () {
    const sampleOTP = {
      name: 'Sample OTP',
      secret: '123456'
    }

    this.otps.push(sampleOTP)
    this.encrypt('test123')
  },
  methods: {
    // Encrypt stored keys with AES-256 encryption
    encrypt (encryptionKey) {
      let encrypted = AES.encrypt(JSON.stringify(this.otps), encryptionKey)
      let decryptedBytes = AES.decrypt(encrypted.toString(), encryptionKey)
      let decryptedText = decryptedBytes.toString(utf8)
      let decryptedObj = JSON.parse(decryptedText)
      console.log(decryptedObj)
    },
    bytesToString(bytes) {
      let result = ''
      for (let i = 0; i < bytes.length; i++) {
        result += String.fromCharCode(parseInt(bytes[i], 2));
      }
      return result;
    }
  }
}
</script>

<style lang="scss">
@import "~normalize.css/normalize.css";
@import "_variables.scss";

.otp-card-list {
  margin: 24px;
}

#app {
  padding: 12px;
}

</style>