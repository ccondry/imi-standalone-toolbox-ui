<template>
  <section class="main">
    <!-- welcome -->
    <welcome />

    <!-- the available agent -->
    <agent v-if="isProvisioned" />

    <!-- demo -->
    <demo v-if="isProvisioned" />

    <!-- Provision -->
    <provision v-if="!isProvisioned" />

    <!-- Reprovision -->
    <reprovision v-if="isProvisioned" />

    <!-- Admin -->
    <admin v-if="isAdmin || isAdminSu" />

    <!-- Copyright and version footer -->
    <app-footer style="margin-bottom: 1rem;" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Agent from '../components/agent'
import AppFooter from '../components/app-footer'
import Demo from '../components/demo'
import Provision from '../components/provision'
import Reprovision from '../components/reprovision'
import Welcome from '../components/welcome'
import Admin from '../components/admin'

export default {
  components: {
    Admin,
    Agent,
    AppFooter,
    Demo,
    Provision,
    Reprovision,
    Welcome
  },

  computed: {
    ...mapGetters([
      'isAdmin',
      'isAdminSu',
      'isProvisioned'
    ])
  }
}
</script>
