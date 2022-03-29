import {ToastProgrammatic as Toast} from 'buefy/src'

const getters = {
  provisionStatus: (state, getters) => getters.userDemoConfig.status
}

const actions = {
  async provisionUser ({getters, dispatch}, email) {
    const response = await dispatch('fetch', {
      message: 'provision user',
      group: 'app',
      type: 'provision',
      url: getters.endpoints.provision,
      message: 'Provision Webex Connect',
      options: {
        method: 'POST',
        body: {
          email
        }
      }
    })
    if (response instanceof Error) {
      Toast.open({
        message: `Failed to provision you for Webex Connect: ${response.message}`,
        duration: 10 * 1000,
        type: 'is-danger'
      })
    } else {
      // check provision status again now to get updated data from server
      dispatch('getUser')
    }
  }
}

export default {
  actions,
  getters
}
