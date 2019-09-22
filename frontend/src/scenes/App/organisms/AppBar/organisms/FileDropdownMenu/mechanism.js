import { connect } from 'react-redux'
import Presentation from './presentation'
import { bindActionCreators } from 'redux'
import { operations as editorOperations } from '../../../Editor/duck'
import { operations as algorithmOperations } from '../../../EditorBar/duck'
import { operations as profileOperations } from '../../duck'

const mapStateToProps = state => ({
  pastExist: state.editor.past.length,
  futureExist: state.editor.future.length,
  editorActionType: state.editor.present.editorActionType,
  isSignIn: state.user.isSignIn,
  selectedProjectId: state.user.selectedProjectId,
  profile: state.user.profile,
  graph: state.editor.present,
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
