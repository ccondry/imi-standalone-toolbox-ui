<template>
  <section class="main">
    <!-- welcome -->
    <welcome />

    <!-- the available agent -->
    <agent />

    <!-- demo website -->
    <!-- <demo-website /> -->

    <!-- demo -->
    <demo />

    <!-- Copyright and version footer -->
    <app-footer style="margin-bottom: 1rem;" />
  </section>
</template>

<script>
import Agent from '../components/agent'
import AppFooter from '../components/app-footer'
import Demo from '../components/demo'
// import DemoWebsite from '../components/demo-website'
import Welcome from '../components/welcome'

export default {
  components: {
    Agent,
    AppFooter,
    Demo,
    // DemoWebsite,
    Welcome
  }
}
</script>
