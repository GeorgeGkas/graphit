import React from 'react'
import { connect } from 'react-redux'
import Presentation from './presentation'
import { bindActionCreators } from 'redux'
import { operations as editorOperations } from '../Editor/duck'
import { operations as profileOperations } from '../AppBar/duck'
import { toast } from 'react-toastify'

const mapStateToProps = state => ({
  profile: state.user.profile,
  selectedProjectId: state.user.selectedProjectId,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...editorOperations,
      ...profileOperations,
    },
    dispatch,
  )

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Mechanism extends React.Component {
  constructor(props) {
    super(props)

    this.getProjects = this.getProjects.bind(this)
    this.fetchAndLoadOnlineState = this.fetchAndLoadOnlineState.bind(this)
    this.deleteProject = this.deleteProject.bind(this)

    this.state = {
      projects: [],
    }
  }

  componentDidMount() {
    this.getProjects()
  }

  getProjects() {
    const requestOptions = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      credentials: 'same-origin',
    }

    fetch(
      `/api/v1/authors/${this.props.profile.id}/projects`,
      requestOptions,
    ).then(res => {
      if (res.ok) {
        res.json().then(projects => this.setState({ projects }))
      } else {
        toast.error('Could not get project list')
      }
    })
  }

  fetchAndLoadOnlineState(projectId) {
    const requestOptions = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      credentials: 'same-origin',
    }

    fetch(`/api/v1/projects/${projectId}`, requestOptions).then(res => {
      if (res.ok) {
        res.json().then(project => {
          if (
            (!this.props.pastExist && !this.props.futureExist) ||
            // eslint-disable-next-line no-restricted-globals
            confirm(
              'Are you sure you want to quit as there are unsaved documents?',
            )
          ) {
            this.props.initEditorHistory()
            this.props.loadState(project)
            this.props.selectProject(projectId)
            this.props.toggleDashboard()
          } else {
            toast.error('Could not get project')
          }
        })
      } else {
        toast.error('Could not get project')
      }
    })
  }

  deleteProject(projectId) {
    const requestOptions = {
      method: 'DELETE',
      mode: 'cors',
      cache: 'default',
      credentials: 'same-origin',
    }

    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete this project?')) {
      fetch(`/api/v1/projects/${projectId}`, requestOptions).then(res => {
        if (res.ok) {
          this.setState({
            projects: this.state.projects.filter(
              project => project.id !== projectId,
            ),
          })
          toast.success('Successfully deleted the project')

          if (this.props.selectedProjectId === projectId) {
            this.props.initEditorHistory()
            this.props.selectProject('')
          }
          this.getProjects()
        } else {
          toast.error('Could not delete project')
        }
      })
    }
  }

  render() {
    return (
      <Presentation
        {...this.props}
        projectList={this.state.projects}
        fetchAndLoadOnlineState={this.fetchAndLoadOnlineState}
        deleteProject={this.deleteProject}
        selectProject={this.props.selectProject}
      />
    )
  }
}

export default Mechanism
