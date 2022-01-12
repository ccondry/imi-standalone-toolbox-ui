import {ToastProgrammatic as Toast} from 'buefy/src'

const actions = {
  async startCollectionsDemo ({getters, dispatch}, body) {
    const response = await dispatch('fetch', {
      message: 'start collections demo',
      group: 'demo',
      type: 'collections',
      url: getters.endpoints.collectionsDemo,
      options: {
        method: 'POST',
        body
      }
    })
    if (response instanceof Error) {
      // let the normal error display
    } else {
      // success
      Toast.open({
        message: 'The demo is starting - please check your phone for the message.',
        type: 'is-success',
        duration: 6 * 1000,
        queue: false
      })
    }
  },
  async startAppointmentsDemo ({getters, dispatch}, body) {
    const response = await dispatch('fetch', {
      message: 'start appointments demo',
      group: 'demo',
      type: 'appointments',
      url: getters.endpoints.appointmentsDemo,
      options: {
        method: 'POST',
        body
      }
    })
    if (response instanceof Error) {
      // let the normal error display
    } else {
      // success
      Toast.open({
        message: 'The demo is starting - please check your phone for the message.',
        type: 'is-success',
        duration: 6 * 1000,
        queue: false
      })
    }
  }
}

export default {
  actions
}
