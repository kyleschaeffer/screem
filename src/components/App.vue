<template>
  <div class="app">
    <ruler v-if="viewportWidth && viewportHeight" :width="viewportWidth" :height="viewportHeight" :ratio="ratio"></ruler>

    <main class="cards" role="main">
      <card title="Resolution" description="Approximate screen resolution in hardware pixels (width × height)">
        <p class="value">{{ resolutionWidth }} × {{ resolutionHeight }}</p>
      </card>

      <card title="Screen" description="Screen resolution in CSS pixels (width × height)">
        <p class="value">{{ screenWidth }} × {{ screenHeight }}</p>
      </card>

      <card title="Viewport" description="Browser viewport size in CSS pixels (width × height)">
        <p class="value">{{ viewportWidth }} × {{ viewportHeight }}</p>
      </card>

      <card title="Aspect Ratio" description="Screen aspect ratio (long edge to short edge)">
        <p class="value">{{ aspect }}</p>
      </card>

      <card title="CSS Pixel Ratio" description="The density ratio of hardware pixels to CSS pixels">
        <p class="value">{{ ratio }}﹕1</p>
      </card>

      <card title="Color Depth" description="Total number of color bits per pixel; on most devices this is the combined total of red, green, and blue channels (for example, 24 bits = 8 bits per R/G/B); some devices also support an alpha channel (for example, 32 bits = 8 bits per R/G/B/A)">
        <p class="value">{{ colorDepth }}</p>
      </card>

      <card title="Orientation" description="Screen orientation reported by CSS media queries">
        <p class="value">{{ orientation }}</p>
      </card>

      <card title="Language" description="Language code(s) reported by browser">
        <p class="value">{{ languages.join(', ') }}</p>
      </card>

      <card title="Location" description="Device location in latitude and longitude; you may need to grant permission to share your location when prompted">
        <p v-if="locationLatitude && locationLongitude" class="value sm">
          <a :href="`https://www.google.com/maps/place/${locationLatitude}+${locationLongitude}`" target="_blank">{{ locationLatitude }}, {{ locationLongitude }}</a>
        </p>
        <p v-else class="value sm">{{ location }}</p>
      </card>

      <card title="User Agent" description="Device, operating system, and browser information reported by browser">
        <p class="value sm">{{ userAgent }}</p>
      </card>
    </main>

    <footer class="footer" role="contentinfo">
      <p class="colophon">
        <strong>Screem</strong> by <a href="https://twitter.com/kyleschaeffer">@kyleschaeffer</a>
      </p>
      <p class="social">
        <a href="https://twitter.com/kyleschaeffer?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-screen-name="false" data-dnt="true" data-show-count="false">Follow @kyleschaeffer</a>
        <a href="https://twitter.com/intent/tweet" class="twitter-share-button" data-text="Nice tool for device screen measurement and diagnostics" data-url="https://screem.io" data-via="kyleschaeffer" data-related="kyleschaeffer" data-dnt="true">Tweet</a>
      </p>
      <ul class="footer-links unlist">
        <li>
          <a href="https://github.com/kyleschaeffer/screem">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
            <span class="label">GitHub</span>
          </a>
        </li>
        <li>
          <a href="https://glyphs.io/">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" aria-hidden="true"><path fill-rule="evenodd" d="M16,0 L24,0 L24,39 L16,39 L16,0 Z M40,25 L48,25 L48,64 L40,64 L40,25 Z M0,16 L15,16 L15,24 L0,24 L0,16 Z M40,0 L48,0 L48,15 L40,15 L40,0 Z M16,49 L24,49 L24,64 L16,64 L16,49 Z M49,40 L64,40 L64,48 L49,48 L49,40 Z M25,16 L64,16 L64,24 L25,24 L25,16 Z M0,40 L39,40 L39,48 L0,48 L0,40 Z" /></svg>
            <span class="label">Glyphs</span>
          </a>
        </li>
        <li>
          <a href="https://tbelt.io/">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path fill-rule="evenodd" d="M13,16 L3,16 L3,0 L13,0 L13,16 Z M4,15 L12,15 L12,1 L4,1 L4,15 Z M14,2 L16,2 L16,14 L14,14 L14,2 Z M0,2 L2,2 L2,14 L0,14 L0,2 Z M9,7 L9,11 L7,11 L7,7 L5,7 L5,5 L11,5 L11,7 L9,7 Z" /></svg>
            <span class="label">Toolbelt</span>
          </a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
import Card from './Card.vue'
import Ruler from './Ruler.vue'
import Utility from '../utility'

export default {
  components: {
    Card,
    Ruler,
  },

  data () {
    return {
      /**
       * CSS pixel density ratio
       * @type {number}
       */
      ratio: 1,

      /**
       * Screen width (in CSS pixels)
       * @type {number}
       */
      screenWidth: 0,

      /**
       * Screen height (in CSS pixels)
       * @type {number}
       */
      screenHeight: 0,

      /**
       * Viewport width (in CSS pixels)
       * @type {number}
       */
      viewportWidth: 0,

      /**
       * Viewport height (in CSS pixels)
       * @type {number}
       */
      viewportHeight: 0,

      /**
       * Screen orientation (as reported by media query)
       * @type {string}
       */
      orientation: 'Landscape',

      /**
       * Screen color depth
       * @type {number}
       */
      colorDepth: 0,

      /**
       * Language codes supported by browser
       * @type {string[]}
       */
      languages: [],

      /**
       * Current geo-location
       * @type {string}
       */
      location: 'Locating…',

      /**
       * Location latitude
       * @type {string}
       */
      locationLatitude: '',

      /**
       * Location longitude
       * @type {string}
       */
      locationLongitude: '',

      /**
       * User agent string reported by browser
       * @type {string}
       */
      userAgent: '',
    }
  },

  computed: {
    /**
     * Screen width (in hardware pixels)
     * @return {number}
     */
    resolutionWidth () {
      return Math.round(this.screenWidth * this.ratio)
    },

    /**
     * Screen height (in hardware pixels)
     * @return {number}
     */
    resolutionHeight () {
      return Math.round(this.screenHeight * this.ratio)
    },

    /**
     * Long edge measurement of screen (in CSS pixels)
     * @return {number}
     */
    screenLong () {
      return Math.max(this.screenWidth, this.screenHeight)
    },

    /**
     * Short edge measurement of screen (in CSS pixels)
     * @return {number}
     */
    screenShort () {
      return Math.min(this.screenWidth, this.screenHeight)
    },

    /**
     * Screen aspect ratio (long edge to short edge)
     * @return {string}
     */
    aspect () {
      // Get greatest common demoninator
      const gcd = Utility.gcd(this.screenWidth, this.screenHeight)
      if (!gcd) return 'Unknown'

      // Get edge ratios
      let longRatio = this.screenLong / gcd
      let shortRatio = this.screenShort / gcd

      // Convert 8:5 to 16:10
      if (longRatio == 8 && shortRatio == 5) {
        longRatio = 16
        shortRatio = 10
      }

      return `${longRatio}﹕${shortRatio}`
    },
  },

  mounted () {
    // Measure screen
    this.measure()

    // Measure on resize
    window.addEventListener('resize', this.measure)
    window.addEventListener('orientationchange', this.measure)

    // Locate
    this.locate()
  },

  methods: {
    /**
     * Measure the screen
     * @return {void}
     */
    measure () {
      this.ratio = window.devicePixelRatio || 1
      this.screenWidth = window.screen.width
      this.screenHeight = window.screen.height
      this.viewportWidth = window.innerWidth
      this.viewportHeight = window.innerHeight
      this.orientation = window.matchMedia('(orientation: portrait)').matches ? 'Portrait' : 'Landscape'
      this.colorDepth = window.screen.colorDepth
      this.languages = window.navigator.languages
      this.userAgent = window.navigator.userAgent
    },

    /**
     * Locate via geo-location
     * @return {void}
     */
    locate () {
      // Location not supported
      if (!window.navigator.geolocation) {
        this.location = 'Not supported'
        return
      }

      // Get location
      window.navigator.geolocation.getCurrentPosition(position => {
        // String position (older browsers)
        if (typeof(position) === 'string') {
          this.location = position
          return
        }

        // Latitude/longitude position
        this.locationLatitude = Utility.location(position.coords.latitude, 90, 3)
        this.locationLongitude = Utility.location(position.coords.longitude, 180, 3)
      }, error => {
        // Error getting location
        if(error.code === error.PERMISSION_DENIED) this.location = 'Permission denied'
        else if(error.code === error.POSITION_UNAVAILABLE) this.location = 'Unavailable'
        else if(error.code === error.TIMEOUT) this.location = 'Timed out'
        else this.location = 'Unavailable'
      })
    },
  },
}
</script>
