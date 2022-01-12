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
  async startAppointmentDemo ({getters, dispatch}, body) {
    const response = await dispatch('fetch', {
      message: 'start appointment demo',
      group: 'demo',
      type: 'appointment',
      url: getters.endpoints.appointmentDemo,
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
