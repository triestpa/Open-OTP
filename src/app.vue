<template>
  <div id="app">
    <otp-card></otp-card>
    <otp-card></otp-card>
  </div>
</template>

<script>
import OtpCard from './otp-card.vue'

export default {
  name: 'app',
  components: { OtpCard },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">



</style>