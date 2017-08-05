<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Component
            </p>
            <a class="card-header-icon">
              <span class="icon">
                <i class="fa fa-angle-down"></i>
              </span>
            </a>
          </header>
          <div class="card-content has-text-centered">
            <qr-code></qr-code>
            <div class="content">
              <h1>{{ otp }}</h1>
              <small>{{ time }}</small>
              <h3 id="error"></h3>
              <progress class="progress is-info" value="45" max="100">45%</progress>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item">Share</a>
            <a class="card-footer-item">Edit</a>
            <a class="card-footer-item">Delete</a>
          </footer>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import OTP from 'tiny-otp'
import qrCode from './qr-code.vue'

export default {
  name: 'otp-card',
  components: { qrCode },
  data () {
    return {
      secret: null,
      time: null,
      otp: null,
      generator: null,
    }
  },

  created () {
    // Use var for these variables, since we want them in the global scope.
    let newSecret = OTP.getRandomInt(0, Math.pow(10, 12))

    // Show default generated secret value in UI
    this.setSecret(newSecret)
  },

  mounted () {
   setInterval(() => {
        // Update time and value every second
        let date = new Date()
        this.time = date.toLocaleString()
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
      let qrContent = `otpauth://totp/${label}?secret=${secretb32}`
    },

    setSecret (newSecret) {
      // let secretInput = document.getElementById('secret')
      // if (!newSecret) {
      //   newSecret = secretInput.value
      // }

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

<style lang="scss">



</style>