<template>
  <panel title="Appointment" aria-id="appointment">
    <p>
      Fill in this form and click Send to start the Appointment Demo.
    </p>
    <!-- channel -->
    <b-field label="Channel">
      <!-- SMS -->
      <b-radio-button
      v-model="form.channel"
      native-value="sms"
      type="is-success is-light is-outlined"
      >
        <span>SMS</span>
      </b-radio-button>
      
      <!-- Whatsapp -->
      <b-radio-button
      v-model="form.channel"
      native-value="whatsapp"
      type="is-success is-light is-outlined"
      >
        <span>Whatsapp</span>
      </b-radio-button>
    </b-field>
    
    <!-- customer name -->
    <b-field label="Name" expanded>
      <b-input v-model="form.name" />
    </b-field>

    <!-- phone number and country -->
    <b-field grouped>
    <!-- country -->
      <b-field label="Country">
        <!-- US -->
        <b-radio-button
        v-model="form.country"
        native-value="US"
        type="is-success is-light is-outlined"
        >
          <span>US</span>
        </b-radio-button>
        
        <!-- UK -->
        <b-radio-button
        v-model="form.country"
        native-value="UK"
        type="is-success is-light is-outlined"
        >
          <span>UK</span>
        </b-radio-button>
      </b-field>

      <!-- customer number -->
      <b-field label="Phone Number">
        <b-input v-model="form.number" required @keyup.enter.native="clickStartDemo" />
      </b-field>
    </b-field>

    <!-- send button -->
    <div class="buttons" style="justify-content: space-around;">
      <!-- start demo -->
      <b-button
      type="is-success"
      rounded
      @click="clickStartDemo"
      :disabled="!formComplete || isWorking"
      >
        {{ isWorking ? 'Sending...' : 'Send' }}
      </b-button>
    </div>
  </panel>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
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