<template>
  <div style="display: flex;">
    <!-- channel -->
    <b-field label="Channel">
      <!-- SMS -->
      <b-radio-button
      v-model="channel"
      native-value="sms"
      type="is-success is-light is-outlined"
      >
        <span>SMS</span>
      </b-radio-button>
      
      <!-- Whatsapp -->
      <b-radio-button
      v-model="channel"
      native-value="whatsapp"
      type="is-success is-light is-outlined"
      >
        <span>Whatsapp</span>
      </b-radio-button>
    </b-field>
    
    <div v-show="channel === 'whatsapp'">
      <span style="white-space: nowrap;">
        Scan this QR code before starting the Whatsapp demo:
      </span>
      <center>
        <img
        :src="qr"
        alt="Whatsapp QR code"
        style="width: 145px;"
        >
      </center>
    </div>
  </div>
</template>

<script>
import qr from '../../assets/images/qr.svg'

export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      qr
    }
  },

  computed: {
    channel: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>