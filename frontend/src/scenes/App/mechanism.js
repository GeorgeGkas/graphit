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
    this.state = {
      grid: false,
      dashboard: false,
    }
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

  render() {
    return (
      <Presentation
        grid={this.state.grid}
        toggleGrid={this.toggleGrid}
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
      />
    )
  }
}

export default App
