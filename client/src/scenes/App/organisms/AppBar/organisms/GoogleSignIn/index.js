/**
 * Import globals.
 */
import React from 'react'

/**
 * Import components.
 */
import { withFirebase } from '../../../../../../organisms/Firebase'

/**
 * Component.
 */
const GoogleSignIn = ({
  buttonText,
  className,
  firebase,
  onFailure,
  onSuccess,
  render,
}) => {
  const doGoogleSignIn = async e => {
    e.preventDefault()

    try {
      const user = await firebase.signIn()
      onSuccess(user)
    } catch (e) {
      onFailure(e)
    }
  }

  if (render) {
    return render(doGoogleSignIn)
  } else {
    return (
      <button className={className} onClick={doGoogleSignIn}>
        {buttonText}
      </button>
    )
  }
}

export default withFirebase(GoogleSignIn)
