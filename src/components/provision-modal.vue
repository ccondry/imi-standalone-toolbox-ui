<template>
  <div class="modal-card" style="width: auto;">
    <header class="modal-card-head">
      <!-- title -->
      <p class="modal-card-title">
        Provision Webex Connect Demo
      </p>
      <!-- close button on top-right -->
      <button
      type="button"
      class="delete"
      style="margin-left: 0.5rem;"
      @click="$emit('close')"
      />
    </header>

    <section 
    class="modal-card-body"
    >
      <p>
        Please enter the email address you wish to use as your login account for
        Webex Connect.
      </p>
      <b-field label="Webex Connect Account Email">
        <b-input
        v-model="input.email"
        />
      </b-field>
    </section>

    <footer class="modal-card-foot" style="justify-content: flex-end;">
      <!-- cancel -->
      <b-button
      rounded
      @click="$emit('close')"
      >
        Cancel
      </b-button>

      <!-- delete -->
      <b-button
      type="is-success"
      rounded
      @click="clickConfirm"
      >
        Start Provision
      </b-button>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: 'Confirm'
    },
    email: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      input: {
        email: ''
      }
    }
  },

  watch: {
    email () {
      this.input.email = this.email
    }
  },

  mounted () {
    this.input.email = this.email
  },

  methods: {
    clickConfirm () {
      this.$emit('submit', this.input.email)
      this.$emit('close')
    }
  }
}
</script>
