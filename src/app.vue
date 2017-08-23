<template>
  <div id="app">
    <h1>Open OTP</h1>
    <p>An open-sourced, web-based, offline-first, time-based one-time-password generator. The OTPs generated here are directly
      compatible with Google Authenticator.</p>
    <p>This is the not-yet-designed POC version.</p>
    <p>The app generates a new 6-digit OTP every 30 seconds, based on the shared secret value.</p>
    <p>The secret is also encoded bellow as a QR code. Try scanning it with Google Authenticator to verify that the generated
      OTPs are in sync.</p>
    <h4>Check Out The Source Code and Contribute!</h4>
    <ul>
      <li><a target="_blank" rel="noopener" href="https://github.com/triestpa/Open-OTP">Open-OTP Project Github Repo</a></li>
      <li><a target="_blank" rel="noopener" href="https://github.com/triestpa/Tiny-OTP">Tiny-OTP Library Github Repo</a></li>
    </ul>
    <div class="otp-card-list">
      <div class="clock-card-container">
        <div class="mui-panel">
          <div class="clock-container">
            <clock></clock>
          </div>
        </div>
      </div>
      <div class="otp-card-container" v-for="(otp, index) in otps" :key="index">
        <otp-card :name="otp.name" :secret="String(otp.secret)"></otp-card>
      </div>
      <div class="otp-card-container">
        <otp-create-card @newOTP="createOtpCard">></otp-create-card>
      </div>
    </div>
  </div>
</template>

<script>
  import AES from 'crypto-js/aes'
  import utf8 from 'crypto-js/enc-utf8'
  import otpCard from './components/otp-card.vue'
  import otpCreateCard from './components/otp-create-card.vue'
  import clock from './components/clock.vue'

  export default {
    name: 'app',
    components: {
      otpCard,
      otpCreateCard,
      clock
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        otps: []
      }
    },
    created() {
      const sampleOTP = {
        name: 'Sample OTP',
        secret: '123456'
      }

      this.otps.push(sampleOTP)
      this.encrypt('test123')
    },
    methods: {
      // Add a new OTP card to the UI
      createOtpCard(secret) {
        const newOTP = {
          name: 'New OTP',
          secret: new String(secret)
        }

        this.otps.push(newOTP)
      },

      // Encrypt stored keys with AES-256 encryption
      encrypt(encryptionKey) {
        let encrypted = AES.encrypt(JSON.stringify(this.otps), encryptionKey)
        let decryptedBytes = AES.decrypt(encrypted.toString(), encryptionKey)
        let decryptedText = decryptedBytes.toString(utf8)
        let decryptedObj = JSON.parse(decryptedText)
        console.log(decryptedObj)
      },
    }
  }
</script>

<style lang="scss">
  @import "~normalize.css/normalize.css";
  @import "~muicss/dist/css/mui.css";
  @import "_variables.scss";

  .clock-container {
    width: 300px;
    height: 300px;
  }

  .otp-card-container {
    flex: 1 1 20%;
    padding: 12px;
  }

   .clock-card-container {
      flex: 0 0;
      padding: 12px;
   }

  .otp-card-list {
    margin: 24px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  #app {
    padding: 12px;
  }
</style>