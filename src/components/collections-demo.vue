<template>
  <panel title="Collections" aria-id="collections">
    <p>
      Fill in this form and click Send to start the Collections Demo.
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
        <b-input v-model="form.customerNumber" required @keyup.enter.native="clickStartDemo" />
      </b-field>
    </b-field>

    <!-- customer email -->
    <!-- <b-field label="Email">
      <b-input v-model="form.customerEmail" />
    </b-field> -->

    <!-- currency and amount of debt -->
    <b-field grouped>
      <!-- currency -->
      <b-field label="Currency">
        <!-- $ -->
        <b-input
        v-model="form.currency"
        placeholder="$"
        style="width: 6rem;"
        />
      </b-field>

      <!-- debt amount -->
      <b-field label="Debt Amount">
        <b-input v-model="form.debtAmount" required />
      </b-field>
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
        country: 'US',
        customerName: '',
        customerNumber: '',
        // customerEmail: '',
        customerSalutation: '',
        debtAmount: '200',
        debtCurrency: '$',
        currency: '$',
        // reminderRequiredStatus: 'Y',
        channel: 'sms'
        // customerReferenceNumber: '0012E00002AHLDEQA5'
      }
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
      if (this.jwtUser && this.jwtUser.email) {
        this.form.customerName = this.jwtUser.firstName
        // this.form.customerEmail = this.jwtUser.email
      }
    },
    clickStartDemo () {
      if (this.formComplete) {
        this.startCollectionsDemo(this.form)
      }
    }
  }
}
</script>