<template>
  <panel title="Call Deflection" aria-id="call-deflection">
    <!-- country -->
    <country
    v-model="country"
    info="Select your region to show the demo number"
    />
    <p>
      Call this number to start the Call Deflection Demo:
    </p>
    <p>
      <strong>
        {{ phone }}
      </strong>
    </p>
  </panel>
</template>

<script>
import Country from './input/country'

export default {
  components: {
    Country
  },

  data () {
    return {
      country: 'US'
    }
  },

  computed: {
    phone () {
      if (this.country === 'US') {
        return '+1-206-848-7318'
      }
      if (this.country === 'UK') {
        return '+44 7418 365836'
      }
      return ''
    }
  }
}
</script>