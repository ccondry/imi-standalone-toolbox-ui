<template>
  <panel title="Collections or Promise to Pay" aria-id="collections">
    <p>
      Fill in this form and click Send to start the Collections or Promise to
      Pay Demo.
    </p>
    <!-- channel -->
    <channel v-model="form.channel" />
    
    <b-field grouped>
      <!-- customerSalutation -->
      <b-field label="Salutation">
        <b-input
        v-model="form.customerSalutation"
        style="width: 6rem;"
        placeholder=""
        />
      </b-field>

      <!-- customer name -->
      <b-field label="Name" expanded>
        <b-input v-model="form.customerName" />
      </b-field>
    </b-field>

    <!-- phone number and country -->
    <b-field grouped>
      <!-- country -->
      <country
      v-show="form.channel === 'sms'"
      v-model="form.country"
      />

      <!-- customer number -->
      <phone v-model="form.customerNumber" />
    </b-field>

    <!-- currency and amount of debt -->
    <b-field grouped>
      <!-- currency -->
      <currency v-model="form.currency" />

      <!-- debt amount -->
      <amount v-model="form.debtAmount" />
    </b-field>

    <!-- customer reference number -->
    <!-- <b-field label="Reference Number">
      <b-input v-model="form.customerReferenceNumber" />
    </b-field> -->

    <!-- send button -->
    <div class="buttons" style="justify-content: space-around;">
      <!-- start collections demo -->
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
import Amount from './input/amount'
import Channel from './input/channel'
import Country from './input/country'
import Currency from './input/currency'
import Phone from './input/phone'

export default {
  components: {
    Amount,
    Channel,
    Country,
    Currency,
    Phone
  },

  data () {
    return {
      form: {
        country: 'US',
        customerName: '',
        customerNumber: '',
        // customerEmail: '',
        customerSalutation: '',
        debtAmount: 200,
        currency: 'USD',
        // reminderRequiredStatus: 'Y',
        channel: 'sms'
        // customerReferenceNumber: '0012E00002AHLDEQA5'
      },
      
    }
  },

  computed: {
    ...mapGetters([
      'jwtUser',
      'working'
    ]),
    formComplete () {
      return this.form.customerNumber.length
    },
    isWorking () {
      return this.working.demo.collections
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
      'startCollectionsDemo'
    ]),
    copyUserData () {
      // copy user first name to form when we get JWT info
      if (this.jwtUser && this.jwtUser.email) {
        this.form.customerName = this.jwtUser.firstName
        // this.form.customerEmail = this.jwtUser.email
      }
    },
    clickStartDemo () {
      // send SMS/whatsapp message
      if (this.formComplete) {
        this.startCollectionsDemo(this.form)
      }
    }
  }
}
</script>