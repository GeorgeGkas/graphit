import React from 'react'

import { withAuthentication } from '../../../../providers/Auth'

const SignOut = ({
  auth,
  buttonText,
  className,
  onFailure,
  onSuccess,
  render,
}) => {
  const doSignOut = () => {
    try {
      auth.signOut()
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

export default withAuthentication(SignOut)
