<template>
  <b-field>
    <template #label>
      Debt Amount
      <b-tooltip
      type="is-dark"
      label="Must be a number between 1 and 400"
      >
        <b-icon size="is-small" icon="information-outline" />
      </b-tooltip>
    </template>
    <b-numberinput 
    v-model="amount"
    :controls="false"
    required
    :min="1"
    :max="400"
    placeholder="200"
    />
  </b-field>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },

  computed: {
    amount: {
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