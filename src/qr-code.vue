<template>
  <canvas ref="qr"></canvas>
</template>

<script>
import QRious from 'qrious'

export default {
  name: 'qr-code',

  data () {
    return {
      qr: null,
    }
  },

  created () {

  },

  mounted () {
    console.log(this.$refs.qr)
    this.qr = new QRious({
      element: this.$refs.qr, //document.getElementById('qr'),
      size: 250,
      level: 'H',
      value: 'this is a test'
    });
  },

  methods: {
    setQRCode (label = 'test') {
      let secretb32 =  this.generator.getBase32Secret()
      let qrContent = `otpauth://totp/${label}?secret=${secretb32}`
      this.qr.set({value: qrContent})
    }
  }
}

</script>

<style lang="scss">



</style>