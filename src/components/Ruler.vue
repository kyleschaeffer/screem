<template>
  <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight" class="ruler"></canvas>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  props: {
    /**
     * Canvas width
     */
    width: {
      type: Number,
      default: undefined,
    },

    /**
     * Canvas height
     */
    height: {
      type: Number,
      default: undefined,
    },

    /**
     * Pixel density ratio
     */
    ratio: {
      type: Number,
      default: 1,
    },

    /**
     * Debouncing delay time before redraw
     */
    delay: {
      type: Number,
      default: 500,
    },
  },

  data () {
    return {
      /**
       * Canvas rendering context
       * @type {CanvasRenderingContext2D}
       */
      ctx: null,
    }
  },

  computed: {
    /**
     * Canvas width (in hardware pixels)
     * @return {number}
     */
    canvasWidth () {
      return this.width * this.ratio
    },

    /**
     * Canvas height (in hardware pixels)
     * @return {number}
     */
    canvasHeight () {
      return this.height * this.ratio
    },
  },

  watch: {
    /**
     * Draw rulers on resize width
     * @return {void}
     */
    width () {
      this.debouncedDraw()
    },

    /**
     * Draw rulers on resize height
     * @return {void}
     */
    height () {
      this.debouncedDraw()
    },
  },

  created () {
    // Debounce canvas redraws
    this.debouncedDraw = debounce(this.draw, this.delay)
  },

  mounted () {
    // Get canvas context
    this.ctx = this.$refs.canvas.getContext('2d')

    // Draw
    this.draw()
  },

  methods: {
    draw () {
      // Clear
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

      // Set styles
      this.ctx.fillStyle = '#000'
      this.ctx.font = `${9 * this.ratio}px sans-serif`
      this.ctx.textAlign = 'center'

      // Draw rulers
      for (let i = 10; i < Math.max(this.width, this.height); i++) {
        // Major grid line
        if (i % 100 === 0) {
          // X-axis
          if (i <= this.width) {
            this.ctx.fillRect(i * this.ratio, 0, 1 * this.ratio, 9 * this.ratio)
            this.ctx.fillText(i, i * this.ratio, 18 * this.ratio)
          }

          // Y-axis
          if (i <= this.height) {
            this.ctx.fillRect(0, i * this.ratio, 9 * this.ratio, 1 * this.ratio)
            this.ctx.fillText(i, 18 * this.ratio, i * this.ratio + (4 * this.ratio))
          }
        }

        // Mid grid line
        else if (i % 50 === 0) {
          // X-axis
          if (i <= this.width) this.ctx.fillRect(i * this.ratio, 0, 1 * this.ratio, 6 * this.ratio)

          // Y-axis
          if (i <= this.height) this.ctx.fillRect(0, i * this.ratio, 6 * this.ratio, 1 * this.ratio)
        }

        // Minor grid line
        else if (i % 10 === 0) {
          // X-axis
          if (i <= this.width) this.ctx.fillRect(i * this.ratio, 0, 1 * this.ratio, 3 * this.ratio)

          // Y-axis
          if (i <= this.height) this.ctx.fillRect(0, i * this.ratio, 3 * this.ratio, 1 * this.ratio)
        }
      }
    },
  },
}
</script>
