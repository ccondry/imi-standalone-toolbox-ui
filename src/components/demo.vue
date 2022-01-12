<template>
  <panel title="Demos" aria-id="demos">
    <div style="display: flex; justify-content: space-between;">
      <appointment-demo style="margin-right: 2rem;" />
      <collections-demo v-show="isAdmin" />
    </div>
  </panel>
</template>

<script>
import { mapGetters } from 'vuex'
import AppointmentDemo from './appointment-demo.vue'
import CollectionsDemo from './collections-demo.vue'

export default {
  components: {
    AppointmentDemo,
    CollectionsDemo
  },

  computed: {
    ...mapGetters([
      'isAdmin'
    ])
  }
}
</script>
