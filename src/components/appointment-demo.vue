<template>
  <panel title="Appointments" aria-id="appointments">
    <p>
      Fill in this form and click Send to start the Appointments Demo.
    </p>
    <!-- channel -->
    <channel v-model="form.channel" />
    
    <!-- customer name -->
    <b-field label="Name" expanded>
      <b-input v-model="form.name" />
    </b-field>

    <!-- phone number and country -->
    <b-field grouped>
      <!-- country -->
      <country
      v-show="form.channel === 'sms'"
      v-model="form.country"
      />

      <!-- customer number -->
      <phone v-model="form.number" />
    </b-field>

    <!-- send button -->
    <div class="buttons" style="justify-content: space-around;">
      <!-- start demo -->
      <b-button
      type="is-success"
      rounded
      :disabled="!formComplete || isWorking"
      @click="clickStartDemo"
      >
        {{ isWorking ? 'Sending...' : 'Send' }}
      </b-button>
    </div>
  </panel>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Channel from './input/channel'
import Country from './input/country'
import Phone from './input/phone'

export default {
  components: {
    Channel,
    Country,
    Phone
  },

  data () {
    return {
      form: {
        name: '',
        number: '',
        country: 'US',
        channel: 'sms'
      }
    }
  },

  computed: {
    ...mapGetters([
      'jwtUser',
      'working'
    ]),
    formComplete () {
      return this.form.number.length
    },
    isWorking () {
      return this.working.demo.appointment
    }
  },

  watch: {
    jwtUser (val) {
      this.copyUserData()
    }
  },

  activated () {
    this.copyUserData()
  },  

  methods: {
    ...mapActions([
      'startAppointmentDemo'
    ]),
    copyUserData () {
      if (this.jwtUser && this.jwtUser.email) {
        this.form.name = this.jwtUser.firstName
      }
    },
    clickStartDemo () {
      if (this.formComplete) {
        this.startAppointmentDemo(this.form)
      }
    }
  }
}
</script>