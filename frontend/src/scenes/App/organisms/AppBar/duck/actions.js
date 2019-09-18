import * as types from './types'

const signIn = user => ({
  type: types.SIGN_IN,
  payload: user,
})

const signOut = () => ({
  type: types.SIGN_OUT,
})

const selectProject = id => ({
  type: types.SELECT_PROJECT,
  payload: id,
})

export { signIn, signOut, selectProject }
