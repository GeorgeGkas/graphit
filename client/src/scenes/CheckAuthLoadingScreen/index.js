import React from 'react'
import { withAuthentication } from '../../providers/Auth'
import Loading from '../../organisms/Loading'

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
