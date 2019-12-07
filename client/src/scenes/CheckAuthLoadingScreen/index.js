import React from 'react'

import Loading from '../../organisms/Loading'
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

  return !authUserInitialFetching ? <>{props.children}</> : <Loading />
}

export default withAuthentication(CheckAuthLoadingScreen)
