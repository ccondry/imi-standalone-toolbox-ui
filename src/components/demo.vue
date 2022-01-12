<template>
  <panel title="Demos" aria-id="demos">
    <div style="display: flex; justify-content: space-between;">
      <appointment-demo style="margin-right: 2rem;" />
      <collections-demo />
    </div>
  </panel>
</template>

<script>
import AppointmentDemo from './appointment-demo.vue'
import CollectionsDemo from './collections-demo.vue'

export default {
  components: {
    AppointmentDemo,
    CollectionsDemo
  }
}
</script>
