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
    
    <div v-show="channel === 'whatsapp'" style="padding-left: 1rem; padding-right: 1rem;">
      Before starting the Whatsapp demo, scan this QR code to send any message
      to +447736239521:
      <center>
        <vue-qr :text="whatsappQrUrl" />
      </center>
    </div>
  </div>
</template>

<script>
import VueQr from 'vue-qr'

export default {
  components: {
    VueQr
  },

  props: {
    value: {
      type: String,
      required: true
    }
  },

  computed: {
    whatsappQrUrl () {
      return 'https://api.whatsapp.com/send?phone=447736239521'
    },
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