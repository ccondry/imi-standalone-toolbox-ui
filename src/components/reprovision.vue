<template>
  <panel title="Reprovision" aria-id="reprovision">
    <p>
      Your account is already provisioned for this demo. Would you like to
      provision again anyway?
    </p>
    <p>
      This will allow you to change your Webex Connect account email
      address if you need to.
    </p>
    <div class="buttons">
      <b-button
      :disabled="working.user.provision"
      type="is-primary"
      rounded
      expanded
      @click.prevent="clickProvision"
      >
        {{ buttonText }}
      </b-button>
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
      'loading',
      'userDemoConfig'
    ]),
    buttonText () {
      if (this.working.user.provision) {
        return `Working...`       
      } else {
        return 'Provision Me Again'
      }
    }
  },

  methods: {
    ...mapActions([
      'provisionUser'
    ]),
    startTimer () {
      // advance the timer every 1 second
      setInterval(() => {
        this.timerNow = new Date().getTime()
      }, 1000)
    },
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