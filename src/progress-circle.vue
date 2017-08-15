<template>
  <div>
    <div class="progress-circle" :data-progress="Math.floor(progress)">
        <div class="circle">
            <div class="full progress-circle__slice">
                <div class="progress-circle__fill"></div>
          </div>
            <div class="progress-circle__slice">
                <div class="progress-circle__fill"></div>
                <div class="progress-circle__fill progress-circle__bar"></div>
            </div>
        </div>
        <div class="progress-circle__overlay">{{ countDown }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'progress-circle',
  props: {
    interval: Number,
  },
  computed: {
    progress () {
      return (this.intervalValue / this.interval) * 100
    },
    countDown () {
      return this.interval - this.intervalValue
    }
  },
  data () {
    return {
      intervalValue: this.getCurrentIntervalValue(),
    }
  },
  mounted () {
    setInterval(() => {
      this.intervalValue = this.getCurrentIntervalValue()
    }, 10)
  },
  methods: {
    getCurrentIntervalValue () {
      return Math.floor((new Date().getTime() / 1000) % this.interval)
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
$inset-color: white;
$inset-text-color: black;
// $transition-length: calc(30s / 100);

.progress-circle {
	margin: 20px auto;
	width:  $circle-size;
	height: $circle-size;

	background-color: $circle-background;
	border-radius: 50%;

		.progress-circle__slice, .progress-circle__fill {
			width:    $circle-size;
			height:   $circle-size;
			position: absolute;
			-webkit-backface-visibility: hidden;
			// transition: transform $transition-length linear;
			border-radius: 50%;
		}

		.progress-circle__slice {
			clip: rect(0px, $circle-size, $circle-size, $circle-size/2);
			.progress-circle__fill {
				clip: rect(0px, $circle-size/2, $circle-size, 0px);
				background-color: $circle-color;
			}
	}

	.progress-circle__overlay {
		width:       $inset-size;
		height:      $inset-size;
		position:    absolute;
		margin-left: ($circle-size - $inset-size)/2;
		margin-top:  ($circle-size - $inset-size)/2;
    line-height: $inset-size;
    text-align: center;
		background-color: $inset-color;
    color: $inset-text-color;
    font-size: xx-large;
		border-radius: 50%;
	}

	$i: 1;
	$increment: 180deg / 100;

	@while $i <= 100 {
		&[data-progress='#{$i}'] {
				.progress-circle__slice.full, .progress-circle__fill {
          transform: rotate($increment * $i);
				}
				.progress-circle__fill.progress-circle__bar {
					transform: rotate($increment * $i * 2);
				}
      $i: $i + 1;
		}
	}
}

</style>