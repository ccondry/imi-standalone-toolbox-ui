const getters = {
  endpoints: (state, getters) => {
    let urlBase
    let authUrlBase

    if (getters.isProduction) {
      urlBase = '/api/v1/imi-standalone'
      authUrlBase = '/api/v1/auth'
    } else {
      // auth API
      // authUrlBase = 'http://localhost:3032/api/v1/auth'
      authUrlBase = 'https://dcloud-collab-toolbox-rtp.cxdemo.net/api/v1/auth'
      // direct to imi-standalone-toolbox-api
      // urlBase = 'https://dcloud-collab-toolbox-rtp.cxdemo.net/api/v1/imi-standalone'
      urlBase = 'http://localhost:3077/api/v1/imi-standalone'
    }

    return {
      collectionsDemo: urlBase + '/demo/collections',
      appointmentDemo: urlBase + '/demo/appointment',
      user: authUrlBase + '/user',
      webex: authUrlBase + '/resource/joinImiSupportRoom',
      version: urlBase + '/version',
      authVersion: authUrlBase + '/version',
      provision: urlBase + '/provision',
      logout: authUrlBase + '/logout'
    }
  },
  defaultRestOptions: (state, getters) => {
    return {
      headers: {
        Authorization: 'Bearer ' + getters.jwt
      }
    }
  }
}

export default {
  getters
}