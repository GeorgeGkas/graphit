import * as actions from './actions'

const { selectProject, signIn: signInAction, signOut: signOutAction } = actions

const signIn = access_token => dispatch => {
  const tokenBlob = new Blob([JSON.stringify({ access_token }, null, 2)], {
    type: 'application/json',
  })
  const requestOptions = {
    body: tokenBlob,
    cache: 'default',
    method: 'POST',

    mode: 'cors',
  }

  fetch('/api/v1/auth/google', requestOptions)
    .then(res => res.json())
    .then(user => dispatch(signInAction(user)))
}

const signOut = () => dispatch => {
  const requestOptions = {
    body: {},
    cache: 'default',
    method: 'POST',

    mode: 'cors',
  }

  fetch('/api/v1/auth/logout', requestOptions).then(() => {
    dispatch(signOutAction())
  })
}

export { selectProject, signIn, signOut }
