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
const SignOut = ({
  buttonText,
  className,
  firebase,
  onFailure,
  onSuccess,
  render,
}) => {
  const doSignOut = async e => {
    e.preventDefault()

    try {
      await firebase.signOut()
      onSuccess()
    } catch (e) {
      onFailure(e)
    }
  }

  if (render) {
    return render(doSignOut)
  } else {
    return (
      <button className={className} onClick={doSignOut}>
        {buttonText}
      </button>
    )
  }
}

export default withFirebase(SignOut)
