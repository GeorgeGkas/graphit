import * as actions from './actions'

const { signIn: signInAction, signOut: signOutAction, selectProject } = actions

const signIn = access_token => dispatch => {
  const tokenBlob = new Blob([JSON.stringify({ access_token }, null, 2)], {
    type: 'application/json',
  })
  const requestOptions = {
    method: 'POST',
    body: tokenBlob,
    mode: 'cors',
    cache: 'default',
  }

  fetch('/api/v1/auth/google', requestOptions)
    .then(res => res.json())
    .then(user => dispatch(signInAction(user)))
}

const signOut = () => dispatch => {
  const requestOptions = {
    method: 'POST',
    body: {},
    mode: 'cors',
    cache: 'default',
  }

  fetch('/api/v1/auth/logout', requestOptions).then(() => {
    dispatch(signOutAction())
  })
}

export { signIn, signOut, selectProject }
