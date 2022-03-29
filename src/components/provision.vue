<template>
  <panel title="Provision" aria-id="provision">
    <p v-if="isLocked">
      <!-- provisioning is not enabled for this instance -->
      Provisioning is disabled for this demo instance. Please try using
      another dCloud datacenter or a newer version of this demo (if one is
      available).
    </p>
    <div v-if="!isLocked">
      <p v-if="userDemoConfig.status === 'started'">
        Your account is being provisioned right now. Please wait...
      </p>
      <p v-if="userDemoConfig.status === 'error'">
        Your last provision attempt had an error: {{ userDemoConfig.error }}
      </p>
      <div
      v-if="userDemoConfig.status !== 'started'"
      >
        <p>
          Would you like to provision your account?
        </p>
        <b-field>
          <b-button
          :disabled="working.user.provision"
          type="is-success"
          rounded
          expanded
          @click.prevent="clickProvision"
          >
            {{ buttonText }}
          </b-button>
        </b-field>
      </div>
    </div>
  </panel>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProvisionModal from './provision-modal'

export default {
  computed: {
    ...mapGetters([
      'jwtUser',
      'working',
      'sessionId',
      'isLocked',
      'userDemoConfig'
    ]),
    buttonText () {
      if (this.working.user.provision) {
        return `Working...`       
      } else {
        return 'Provision Me'
      }
    }
  },

  methods: {
    ...mapActions([
      'provisionUser'
    ]),
    clickProvision () {
      const emailParts = this.jwtUser.email.split('@')
      this.$buefy.modal.open({
        parent: this,
        // component: PromptModal,
        component: ProvisionModal,
        hasModalCard: true,
        trapFocus: true,
        canCancel: ['escape'],
        props: {
          email: this.userDemoConfig.email || `${emailParts[0]}+dcloudimi@${emailParts[1]}`
        },
        events: {
          submit: (email) => {
            this.provisionUser(email)
          }
        }
      })
    }
  }
}
</script>