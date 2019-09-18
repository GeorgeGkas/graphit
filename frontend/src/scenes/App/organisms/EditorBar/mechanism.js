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
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...editorOperations, ...algorithmOperations, ...profileOperations },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presentation)
