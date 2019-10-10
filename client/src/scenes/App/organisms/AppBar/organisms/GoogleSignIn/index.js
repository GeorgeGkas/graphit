/**
 * Import globals.
 */
import React from 'react'

/**
 * Import components.
 */
import { withAuthentication } from '../../../../../../providers/Auth'

/**
 * Component.
 */
const GoogleSignIn = ({
  auth,
  buttonText,
  className,
  onFailure,
  onSuccess,
  render,
}) => {
  const doGoogleSignIn = async () => {
    try {
      await auth.signIn()
      onSuccess()
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

export default withAuthentication(GoogleSignIn)
