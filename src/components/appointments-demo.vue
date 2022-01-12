<template>
  <panel title="Appointments" aria-id="appointments">
    <p>
      Fill in this form and click Send to start the Appointments Demo.
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
      <b-input v-model="form.name" required />
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
        <b-input v-model="form.number" required />
      </b-field>
    </b-field>

    <!-- send button -->
    <div class="buttons" style="justify-content: space-around;">
      <!-- start collections demo -->
      <b-button
      type="is-success"
      rounded
      @click="clickStartAppointmentsDemo"
      >
        Send
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
      'jwtUser'
    ])
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
      'startAppointmentsDemo'
    ]),
    copyUserData () {
      if (this.jwtUser && this.jwtUser.email) {
        this.form.name = this.jwtUser.firstName + ' ' + this.jwtUser.lastName
      }
    },
    clickStartAppointmentsDemo () {
      this.startAppointmentsDemo(this.form)
    }
  }
}
</script>