<template>
  <panel title="Demos" aria-id="demos">
    <div style="display: flex; justify-content: space-between;">
      <appointments-demo style="margin-right: 2rem;" />
      <collections-demo v-show="isAdmin" />
    </div>
  </panel>
</template>

<script>
import { mapGetters } from 'vuex'
import AppointmentsDemo from './appointments-demo.vue'
import CollectionsDemo from './collections-demo.vue'

export default {
  components: {
    AppointmentsDemo,
    CollectionsDemo
  },

  computed: {
    ...mapGetters([
      'isAdmin'
    ])
  }
}
</script>
