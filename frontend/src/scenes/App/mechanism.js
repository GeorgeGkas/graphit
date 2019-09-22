import React from 'react'
import Presentation from './presentation'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { operations as editorOperations } from './organisms/Editor/duck'
import { toast } from 'react-toastify'

const mapStateToProps = state => ({
  selectedNode: state.editor.present.selectedNode,
  selectedArrow: state.editor.present.selectedArrow,
  editorActionType: state.editor.present.editorActionType,
  isMultiSelect: state.editor.isMultiSelect,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(editorOperations, dispatch)

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

  render() {
    return (
      <Presentation
        grid={this.state.grid}
        toggleGrid={this.toggleGrid}
        isMultiSelect={this.props.isMultiSelect}
        selectedNode={this.props.selectedNode}
        editorActionType={this.props.editorActionType}
        selectedArrow={this.props.selectedArrow}
        dashboard={this.state.dashboard}
        toggleDashboard={this.toggleDashboard}
      />
    )
  }
}

export default App
