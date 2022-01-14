<template>
  <panel title="Demos" aria-id="demos">
    <div style="display: flex; justify-content: space-between;">
      <appointment-demo style="margin-right: 2rem;" />
      <collections-demo style="margin-right: 2rem;" />
      <call-deflection-demo style="margin-bottom: 1.5rem;" />
    </div>
  </panel>
</template>

<script>
import AppointmentDemo from './appointment-demo.vue'
import CallDeflectionDemo from './call-deflection-demo.vue'
import CollectionsDemo from './collections-demo.vue'

export default {
  components: {
    AppointmentDemo,
    CallDeflectionDemo,
    CollectionsDemo
  }
}
</script>
