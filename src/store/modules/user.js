import {
  DialogProgrammatic as Dialog,
  ToastProgrammatic as Toast
} from 'buefy/src'

import * as types from '../mutation-types'

// parse a JWT payload into a JSON object
function parseJwt (token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(window.atob(base64))
}

const state = {
  jwt: null,
  user: null
}

const mutations = {
  [types.SET_JWT] (state, data) {
    state.jwt = data
  },
  [types.SET_USER] (state, data) {
    state.user = data
  }
}

const getters = {
  isAdminSu: (state, getters) => {
    try {
      return getters.jwtUser.suJwt
    } catch (e) {
      return false
    }
  },
  isAdmin: (state, getters) => {
    try {
      return getters.jwtUser.admin
    } catch (e) {
      return false
    }
  },
  jwt: state => state.jwt,
  isLoggedIn: (state, getters) => {
    try {
      return getters.jwtUser.email.length > 0
    } catch (e) {
      return false
    }
  },
  jwtUser: state => {
    try {
      return parseJwt(state.jwt)
    } catch (e) {
      return {}
    }
  },
  userDemoConfig: (state, getters) => {
    try {
      return state.user.demo['imi-standalone-v1'] || {}
    } catch (e) {
      return {}
    }
  },
  isProvisioned: (state, getters) => {
    // user provision is complete
    try {
      return getters.userDemoConfig.status === 'complete'
    } catch (e) {
      return false
    }
  }
}

const actions = {
  async logout ({dispatch, getters}) {
    const response = await dispatch('fetch', {
      group: 'user',
      type: 'logout',
      url: getters.endpoints.logout,
      options: {
        method: 'POST'
      },
      message: 'logout'
    })
    // did we get a new JWT (from logging out of switch-user)?
    if (response && response.jwt) {
      // save new JWT
      dispatch('setJwt', response.jwt)
    } else {
      // make user log in again
      dispatch('login')
    }
  },
  setJwt ({commit, dispatch}, jwt) {
    try {
      // test parse JWT to user JSON
      parseJwt(jwt)
      // put JWT in state
      commit(types.SET_JWT, jwt)
      // put JWT in localStorage
      window.localStorage.setItem('jwt', jwt)
      // get full user details now
      dispatch('getUser')
    } catch (e) {
      // parseJwt failed - delete this invalid JWT
      dispatch('unsetJwt')
    }
  },
  unsetJwt ({commit}) {
    // remove JWT from state
    commit(types.SET_JWT, null)
    // remove JWT from localStorage
    window.localStorage.removeItem('jwt')
  },
  login ({dispatch, getters}) {
    if (getters.isProduction) {
      // production - forward to auth page for SSO
      window.location = '/auth'
    } else {
      // development - prompt for JWT
      Dialog.prompt({
        title: 'Log In',
        message: `Enter your JWT:`,
        onConfirm: (jwt) => {
          dispatch('setJwt', jwt)
        },
        canCancel: false,
        inputAttrs: {
          type: 'textarea'
        },
        confirmText: 'Log In',
        type: 'is-success',
        rounded: true
      })
    }
  },
  async checkJwt ({dispatch, getters}) {
    // dispatch('setWorking', {group: 'user', type: 'login', value: true})
    // check jwt in browser local storage
    const jwt = window.localStorage.getItem('jwt')
    // if we found a token, check the web service to see if it's still valid
    if (jwt !== null && jwt.length > 40) {
      console.log('found existing JWT in localStorage')
      // store JWT in state
      dispatch('setJwt', jwt)
    } else {
      // no JWT found - make the user log in
      dispatch('login')
    }
  },
  async getUser ({dispatch, getters}) {
    // get full user details
    await dispatch('fetch', {
      group: 'user',
      type: 'details',
      url: getters.endpoints.user,
      message: 'get user details',
      mutation: types.SET_USER
    })

    // if user is being provisioned right now
    if (getters.userDemoConfig.status === 'started') {
      // and check provision status for them again in a moment 
      window.setTimeout(() => {
        dispatch('getUser')
      }, 10 * 1000)
    }
  },
  async saveUserDemoConfig ({dispatch, getters}, body) {
    const response = await dispatch('fetch', {
      group: 'user',
      type: 'demoConfig',
      url: getters.endpoints.userDemoConfig,
      options: {
        method: 'POST',
        body,
        query: {
          id: 'imi-standalone-v1'
        }
      },
      message: 'Save demo configuration',
      showNotification: true
    })
    if (response instanceof Error) {
      // error
    } else {
      // success
      Toast.open({
        message: 'Saved your demo configuration.',
        type: 'is-success'
      })
      // refresh state data
      dispatch('getUser')
    }
  }
}

export default {
  actions,
  state,
  getters,
  mutations
}