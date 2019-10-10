import React from 'react'
import { withAuthentication } from '../../providers/Auth'

const CheckAuthLoadingScreen = ({ auth, ...props }) => {
  const [authUserInitialFetching, setAuthUserInitialFetching] = React.useState(
    true,
  )

  React.useEffect(() => {
    ;(async () => {
      await auth.requestAuthUser()
      setAuthUserInitialFetching(false)
    })()
  }, [])

  return !authUserInitialFetching ? (
    <React.Fragment>{props.children}</React.Fragment>
  ) : (
    <div>Checking user authentication...</div>
  )
}

export default withAuthentication(CheckAuthLoadingScreen)
