<template>
  <panel title="Demo Website" aria-id="demo-website">
    <p>
      Click this button to show the customer side of the demo.
    </p>
    <div class="buttons" style="justify-content: space-around;">
      <b-field>
        <b-button
        type="is-primary"
        rounded
        tag="a"
        target="_blank"
        :href="demoWebsiteUrl"
        >
          Go to Demo Website
        </b-button>
      </b-field>
    </div>
  </panel>
</template>

<script>
export default {
  data () {
    return {
      demoWebsiteUrl: 'https://dcloud-menu.imisolutions.repl.co/'
    }
  }
}
</script>