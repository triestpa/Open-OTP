<template>
  <canvas ref="qr"></canvas>
</template>

<script>
import QRious from 'qrious'

export default {
  name: 'qr-code',
  props: { content: String },
  watch: {
    content: function (value) {
      this.updateQR(value)
    }
  },
  mounted () {
    this.instantiateQR()
  },
  methods: {
    instantiateQR () {
      this.qr = new QRious({
        element: this.$refs.qr,
        size: 250,
        level: 'H',
        value: this.content
      })
    },
    updateQR (value) {
      this.qr.set({value})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>