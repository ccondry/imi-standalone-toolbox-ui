<template>
  <b-field>
    <template #label>
      Country
      <b-tooltip
      type="is-dark"
      :label="tooltip"
      >
        <b-icon size="is-small" icon="information-outline" />
      </b-tooltip>
    </template>
    <b-radio-button
    v-model="country"
    native-value="US"
    type="is-success is-light is-outlined"
    >
      <span>US</span>
    </b-radio-button>
    <b-radio-button
    v-model="country"
    native-value="UK"
    type="is-success is-light is-outlined"
    >
      <span>UK</span>
    </b-radio-button>
  </b-field>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    tooltip: {
      type: String,
      default: `Select either US or UK SMS gateway`
    }
  },

  computed: {
    country: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>