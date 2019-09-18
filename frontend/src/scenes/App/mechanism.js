import React from 'react'
import Presentation from './presentation'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { operations as editorOperations } from './organisms/Editor/duck'
import { operations as profileOperations } from './organisms/AppBar/duck'
import { toast } from 'react-toastify'

const mapStateToProps = state => ({
  selectedNode: state.editor.present.selectedNode,
  selectedArrow: state.editor.present.selectedArrow,
  nodes: state.editor.present.nodes,
  arrows: state.editor.present.connected,
  editorActionType: state.editor.present.editorActionType,
  scaleStage: state.editor.present.scaleStage,
  cursor: state.editor.present.cursor,
  pastExist: state.editor.past.length,
  futureExist: state.editor.future.length,
  present: state.editor.present,
  isMultiSelect: state.editor.isMultiSelect,
  selectedProjectId: state.user.selectedProjectId,
  isSignIn: state.user.isSignIn,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...editorOperations, ...profileOperations }, dispatch)

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class App extends React.Component {
  constructor(props) {
    super(props)

    this.toggleGrid = this.toggleGrid.bind(this)
    this.toggleDashboard = this.toggleDashboard.bind(this)
    this.zoom = this.zoom.bind(this)
    this.save = this.save.bind(this)
    this.saveInCloud = this.saveInCloud.bind(this)
    this.updateInCloud = this.updateInCloud.bind(this)
    this.open = this.open.bind(this)
    this.state = {
      grid: false,
      dashboard: false,
    }
  }

  open() {
    document.getElementById('load_state').click()
  }

  toggleDashboard() {
    if (this.state.dashboard) {
      this.setState({
        dashboard: false,
      })
    } else {
      const requestOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',
      }

      fetch('/api/v1/auth/token', requestOptions).then(res => {
        if (!res.ok) {
          toast.error('Unauthoriazed action')
        } else {
          this.setState({
            dashboard: true,
          })
        }
      })
    }
  }

  save() {
    const element = document.createElement('a')
    element.setAttribute(
      'href',
      'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(this.props.present, null, 2)),
    )
    element.setAttribute('download', 'editor.json')

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  }

  updateInCloud() {
    const bodyBlob = new Blob(
      [
        JSON.stringify(
          {
            content: JSON.stringify(this.props.present),
          },
          null,
          2,
        ),
      ],
      {
        type: 'application/json',
      },
    )

    const requestOptions = {
      method: 'PATCH',
      body: bodyBlob,
      mode: 'cors',
      cache: 'default',
      credentials: 'same-origin',
    }

    fetch(
      `/api/v1/projects/${this.props.selectedProjectId}`,
      requestOptions,
    ).then(res => {
      if (res.ok) {
        toast.success('Project updated successfully')
      } else {
        toast.error('Could not update project')
      }
    })
  }

  saveInCloud() {
    let projectName = prompt('Project name')

    if (!projectName || !projectName.trim()) {
      return
    }

    const bodyBlob = new Blob(
      [
        JSON.stringify(
          {
            content: JSON.stringify(this.props.present),
            name: projectName.trim(),
            algorithm: 'Dijkstra',
          },
          null,
          2,
        ),
      ],
      {
        type: 'application/json',
      },
    )

    const requestOptions = {
      method: 'POST',
      body: bodyBlob,
      mode: 'cors',
      cache: 'default',
      credentials: 'same-origin',
    }

    fetch('/api/v1/projects', requestOptions).then(res => {
      if (res.ok) {
        res.json().then(id => {
          this.props.selectProject(id)
          toast.success('Project saved successfully')
        })
      } else {
        toast.error('Could not save project')
      }
    })
  }

  toggleGrid() {
    this.setState({ grid: !this.state.grid })
  }

  deleteShape() {
    this.props.deleteShape()

    for (const node of this.props.selectedNode) {
      this.props.deleteNode(node)
    }
    for (const arrow of this.props.selectedArrow) {
      this.props.deleteArrow(arrow)
    }
  }

  zoom(type) {
    const scaleBy = 1.1
    const oldScale = this.props.scaleStage

    const mousePointTo = {
      x: this.props.cursor.x / oldScale / oldScale,
      y: this.props.cursor.y / oldScale / oldScale,
    }

    let newScale = type === 'zoomIn' ? oldScale * scaleBy : oldScale / scaleBy

    this.props.scaleStageBy(newScale)

    const newPos = {
      x: -(mousePointTo.x / newScale) * newScale,
      y: -(mousePointTo.y / newScale) * newScale,
    }

    this.props.updateStagePosition(newPos)
  }

  render() {
    return (
      <Presentation
        grid={this.state.grid}
        toggleGrid={this.toggleGrid}
        zoom={this.zoom}
        save={this.save}
        open={this.open}
        isMultiSelect={this.props.isMultiSelect}
        selectedNode={this.props.selectedNode}
        nodes={this.props.nodes}
        updateNodeName={this.props.updateNodeName}
        editorActionType={this.props.editorActionType}
        selectedArrow={this.props.selectedArrow}
        arrows={this.props.arrows}
        updateArrowWeight={this.props.updateArrowWeight}
        dashboard={this.state.dashboard}
        toggleDashboard={this.toggleDashboard}
        saveInCloud={this.saveInCloud}
        updateInCloud={this.updateInCloud}
      />
    )
  }
}

export default App
