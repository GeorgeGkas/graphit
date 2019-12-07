import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { operations as projectsOperations } from '../../ducks/projects'
import Loading from '../../organisms/Loading'

const mapStateToProps = null

const mapDispatchToProps = dispatch =>
  bindActionCreators(projectsOperations, dispatch)

const FetchProjectId = ({ getProjectById, ...props }) => {
  const { id } = useParams()

  const [projectFetching, setProjectFetching] = React.useState(true)

  React.useEffect(() => {
    ;(async () => {
      if (id) {
        await getProjectById(id)
      }
      setProjectFetching(false)
    })()
  }, [])

  return !projectFetching ? <>{props.children}</> : <Loading />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FetchProjectId)
