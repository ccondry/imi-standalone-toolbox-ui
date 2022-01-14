<template>
  <b-field>
    <template #label>
      Currency
      <b-tooltip
      type="is-dark"
      label="Must be a currency code, such as USD, GBP, EUR"
      >
        <b-icon size="is-small" icon="information-outline" />
      </b-tooltip>
    </template>
    <!-- $ -->
    <b-autocomplete
    v-model="currency"
    :data="autocomplete"
    field="name"
    placeholder="USD"
    style="width: 6rem;"
    />
  </b-field>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      codes: [
        'USD',
        'GBP',
        'EUR'
      ]
    }
  },

  computed: {
    autocomplete () {
      // filtered list of recipe names for autocomplete to choose from
      // more options are filtered out as user types into the autocomplete
      return this.codes.filter(v => {
        return v.indexOf(this.currency.toUpperCase()) >= 0
      })
    },
    currency: {
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