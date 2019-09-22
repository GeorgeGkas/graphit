import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Presentation from './presentation'
import { operations as editorOperations } from '../Editor/duck'
import { operations as algorithmOperations } from './duck'
import { operations as profileOperations } from '../AppBar/duck'

const mapStateToProps = state => ({
  pastExist: state.editor.past.length,
  futureExist: state.editor.future.length,
  editorActionType: state.editor.present.editorActionType,
  nextAlgorithmEntryExist:
    state.algorithm.steps[state.algorithm.currentIndex + 1] !== undefined,
  previousAlgorithmEntryExist:
    state.algorithm.steps[state.algorithm.currentIndex - 1] !== undefined,
  isSignIn: state.user.isSignIn,
  selectedProjectId: state.user.selectedProjectId,
  currentStageScale: state.editor.present.scaleStage,
  cursorPosition: state.editor.present.cursor,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...editorOperations, ...algorithmOperations, ...profileOperations },
    dispatch,
  )

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Mechanism extends React.Component {
  constructor(props) {
    super(props)

    this.zoomIn = this.zoomIn.bind(this)
    this.zoomOut = this.zoomOut.bind(this)
  }

  zoomOut() {
    const scaleBy = 1.1

    const mousePointTo = {
      x:
        this.props.cursorPosition.x /
        this.props.currentStageScale /
        this.props.currentStageScale,
      y:
        this.props.cursorPosition.y /
        this.props.currentStageScale /
        this.props.currentStageScale,
    }

    let newScale = this.props.currentStageScale / scaleBy

    this.props.scaleStageBy(newScale)

    const newPos = {
      x: -(mousePointTo.x / newScale) * newScale,
      y: -(mousePointTo.y / newScale) * newScale,
    }

    this.props.updateStagePosition(newPos)
  }

  zoomIn() {
    const scaleBy = 1.1

    const mousePointTo = {
      x:
        this.props.cursorPosition.x /
        this.props.currentStageScale /
        this.props.currentStageScale,
      y:
        this.props.cursorPosition.y /
        this.props.currentStageScale /
        this.props.currentStageScale,
    }

    let newScale = this.props.currentStageScale * scaleBy

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
        {...this.props}
        zoomIn={this.zoomIn}
        zoomOut={this.zoomOut}
      />
    )
  }
}

export default Mechanism
