import * as types from './types'

const signIn = user => ({
  payload: user,
  type: types.SIGN_IN,
})

const signOut = () => ({
  type: types.SIGN_OUT,
})

const selectProject = id => ({
  payload: id,
  type: types.SELECT_PROJECT,
})

export { selectProject, signIn, signOut }
