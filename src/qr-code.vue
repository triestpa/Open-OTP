<template>
  <canvas ref="qr"></canvas>
</template>

<script>
import QRious from 'qrious'

export default {
  name: 'qr-code',
  props: { content: String },
  watch: {
    content: (value) => {
      console.log(value)
      this.qr.set({value})
    }
  },
  mounted () {
    this.qr = new QRious({
      element: this.$refs.qr,
      size: 250,
      level: 'H',
      value: 'this is a test',
      value: this.content
    });
  }
}
</script>

<style lang="scss" scoped>

</style>