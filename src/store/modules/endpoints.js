const getters = {
  endpoints: (state, getters) => {
    let urlBase
    let authUrlBase

    if (getters.isProduction) {
      urlBase = '/api/v1/imi-standalone'
      authUrlBase = '/api/v1/auth'
    } else {
      // auth API
      authUrlBase = 'http://localhost:3032/api/v1/auth'
      // direct to imi-standalone-toolbox-api
      urlBase = 'http://localhost:3066/api/v1/imi-standalone'
    }

    return {
      webex: authUrlBase + '/resource/joinWxmSupportRoom',
      version: urlBase + '/version',
      authVersion: authUrlBase + '/version',
      doProvision: urlBase + '/provision',
      getProvision: authUrlBase + '/provision',
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