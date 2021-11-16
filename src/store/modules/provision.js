import * as types from '../mutation-types'
import {ToastProgrammatic as Toast} from 'buefy/src'

const state = {
  status: null
}

const getters = {
  provisionStatus: state => state.status
}

const mutations = {
  [types.SET_PROVISION_STATUS] (state, data) {
    try {
      // console.log('SET_PROVISION_STATUS', data.demo['imi-standalone-v1'].status)
      state.status = data.demo['imi-standalone-v1'].status
    } catch (e) {
      // leave it
    }
  }
}

const actions = {
  async getProvision ({getters, dispatch}) {
    const response = await dispatch('fetch', {
      message: 'get provision status',
      group: 'app',
      type: 'provision',
      url: getters.endpoints.user,
      mutation: types.SET_PROVISION_STATUS
    })
    if (response instanceof Error) {
      // error
      return
    }
    // success
    // check if provision status is "started"
    const provision = response.demo['imi-standalone-v1'].status
    // and check provision status for them again in a moment
    if (provision === 'started') {
      window.setTimeout(() => {
        dispatch('getProvision')
      }, 10 * 1000)
    }
  },
  async provisionUser ({getters, dispatch}) {
    const response = await dispatch('fetch', {
      message: 'provision user',
      group: 'app',
      type: 'provision',
      url: getters.endpoints.provision,
      message: 'Provision IMI Standalone',
      options: {
        method: 'POST'
      }
    })
    if (response instanceof Error) {
      Toast.open({
        message: `Failed to provision you for IMI Standalone: ${response.message}`,
        duration: 10 * 1000,
        type: 'is-danger'
      })
    } else {
      // check provision status again now to get updated data from server
      dispatch('getProvision')
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
