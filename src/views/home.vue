<template>
  <section class="main">
    <!-- welcome -->
    <welcome />

    <!-- demo website -->
    <demo-website />

    <!-- the available agent -->
    <agent />

    <!-- Copyright and version footer -->
    <app-footer style="margin-bottom: 1rem;" />
  </section>
</template>

<script>
import Welcome from '../components/welcome'
import DemoWebsite from '../components/demo-website'
import Agent from '../components/agent'
import AppFooter from '../components/app-footer'

export default {
  components: {
    Welcome,
    Agent,
    AppFooter
  }
}
</script>
