<template>
  <div>
    <div class="ko-progress-circle" :data-progress="Math.floor(progress)">
        <div class="ko-circle">
            <div class="full ko-progress-circle__slice">
                <div class="ko-progress-circle__fill" :style="transitionStyle"></div>
          </div>
            <div class="ko-progress-circle__slice" :style="transitionStyle">
                <div class="ko-progress-circle__fill" :style="transitionStyle"></div>
                <div class="ko-progress-circle__fill ko-progress-circle__bar" :style="transitionStyle"></div>
            </div>
        </div>
        <div class="ko-progress-circle__overlay">test</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'progress-circle',
  props: { interval: Number },
  data () {
    return {
      transitionStyle: {
        transition: `transform ${this.interval / 100}s linear`,
      },
      progress: this.getProgress()
    }
  },
  mounted () {
    setInterval(() => {
      this.progress = this.getProgress()
    }, 10)
  },
  methods: {
    getProgress () {
      let now = (new Date().getTime() / 1000) % this.interval
      let progress = (now / this.interval) * 100
      return progress
    }
  }
}
</script>

<style lang="scss" scoped>
/** Adapted from https://codepen.io/msafi/pen/jrrgGw **/
$circle-size: 120px;
$circle-background: #c2c2c2;
$circle-color: #2db8e8;
$inset-size: 105px;
$inset-color: #fff;
// $transition-length: calc(30s / 100);

.ko-progress-circle {
	margin: 20px auto;
	width:  $circle-size;
	height: $circle-size;

	background-color: $circle-background;
	border-radius: 50%;

		.ko-progress-circle__slice, .ko-progress-circle__fill {
			width:    $circle-size;
			height:   $circle-size;
			position: absolute;
			-webkit-backface-visibility: hidden;
			// transition: transform $transition-length linear;
			border-radius: 50%;
		}

		.ko-progress-circle__slice {
			clip: rect(0px, $circle-size, $circle-size, $circle-size/2);
			.ko-progress-circle__fill {
				clip: rect(0px, $circle-size/2, $circle-size, 0px);
				background-color: $circle-color;
			}
	}

	.ko-progress-circle__overlay {
		width:       $inset-size;
		height:      $inset-size;
		position:    absolute;
		margin-left: ($circle-size - $inset-size)/2;
		margin-top:  ($circle-size - $inset-size)/2;
    line-height: $inset-size;
    text-align: center;

		background-color: $inset-color;
		border-radius: 50%;
	}

	$i: 1;
	$increment: 180deg / 100;

	@while $i <= 100 {
		&[data-progress='#{$i}'] {
				.ko-progress-circle__slice.full, .ko-progress-circle__fill {
          transform: rotate($increment * $i);
				}
				.ko-progress-circle__fill.ko-progress-circle__bar {
					transform: rotate($increment * $i * 2);
				}
      $i: $i + 1;
		}
	}
}

</style>