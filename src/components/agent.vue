<template>
  <panel
  title="User Accounts"
  aria-id="User Accounts"
  >
    <!-- loading/working -->
    <b-loading
    :active="isLoading || isWorking"
    :is-full-page="false"
    />

    <div class="tile is-parent">
      <!-- {{ provisionStatus }} -->
      <!-- provision complete -->
      <article
      class="tile is-child box"
      style="border: 1px solid rgb(204, 204, 204);"
      >
        <div v-if="isProvisionStarted || isProvisionComplete">
          <p class="title" style="white-space: nowrap;">
            Sandra Jefferson
          </p>

          <p class="subtitle" style="white-space: nowrap;">
            Agent
          </p>

          <div style="display: flex; justify-content: space-around;">
            <img :src="agentPicture" style="width: 128px; height: 128px; align-self: center;">
          </div>

          <p v-if="isProvisionComplete">
            <strong style="white-space:nowrap">
              Username:
              {{ agentUsername }}
            </strong>
            <copy :value="agentUsername" name="Username" />
          </p>

          <p v-if="isProvisionComplete">
            <strong style="white-space:nowrap">
              Password:
            </strong>
            <b-tooltip
            type="is-dark"
            label="Use the password you created after clicking the activation link that IMI sent to your email. You can reset it on the Webex Connect login page."
            multilined
            >
              <span>
                your chosen password
              </span>
              <b-icon size="is-small" icon="information-outline" />
            </b-tooltip>
          </p>

          <p v-if="isProvisionStarted">
            <strong>
              Status: Provisioning...
            </strong>
          </p>
        </div>
        
      </article>
    </div>

    <!-- portal button -->
    <div class="buttons" style="justify-content: space-around;">
      <b-field>
        <a
        href="https://login-us.imiconnect.io"
        target="_blank"
        class="button is-primary is-rounded is-fullwidth"
        >
          Go to Webex Connect
        </a>
      </b-field>
    </div>
  </panel>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      agentPicture: 'https://mm.cxdemo.net/static/images/cumulus/common/sandra.png'
    }
  },
  
  computed: {
    ...mapGetters([
      'userDemoConfig',
      'provisionStatus',
      'loading',
      'working',
      'jwtUser'
    ]),
    agentUsername () {
      // append +dcloudimi tag to the user's email
      const emailParts = this.jwtUser.email.split('@')
      // emailParts[0] += '+dcloudimi'
      // return emailParts.join('@')
      return this.userDemoConfig.email || `${emailParts[0]}+dcloudimi@${emailParts[1]}`
    },
    isProvisionComplete () {
      return this.provisionStatus === 'complete'
    },
    isProvisionStarted () {
      return this.provisionStatus === 'started'
    },
    isProvisionError () {
      return this.provisionStatus === 'error'
    },
    isWorking () {
      return this.working.app.provision
    },
    isLoading () {
      return this.loading.app.user
    }
  },

  methods: {
    ...mapActions([
      'copyToClipboard',
      'provisionUser'
    ]),
    clickCopy (string, type) {
      this.copyToClipboard({string, type})
    }
  }
}
</script>