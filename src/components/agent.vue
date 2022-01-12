<template>
  <panel
  title="IMI User"
  aria-id="IMI User"
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
            <span>
              your chosen password
            </span>
          </p>

          <p v-if="isProvisionStarted">
            <strong>
              Status: Provisioning...
            </strong>
          </p>
        </div>
        <!-- provision button -->
        <b-button
        v-show="!isProvisionStarted && !isProvisionComplete"
        type="is-success"
        rounded
        expanded
        :disabled="isLoading || isWorking"
        @click="clickProvision"
        >
          {{ isProvisionError ? 'Retry Provision' : 'Provision Me for IMIConnect' }}
        </b-button>
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
          Go to IMIConnect
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
      'provisionData',
      'provisionStatus',
      'loading',
      'working',
      'jwtUser'
    ]),
    agentUsername () {
      // append +dcloudimi tag to the user's email
      // const emailParts = this.jwtUser.email.split('@')
      // emailParts[0] += '+dcloudimi'
      // return emailParts.join('@')
      return this.provisionData.email
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
    },
    clickProvision () {
      this.provisionUser()
    }
  }
}
</script>