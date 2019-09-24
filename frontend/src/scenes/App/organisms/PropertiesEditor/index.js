/**
 * Import globals.
 */
import React, { useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * Import UI framework modules.
 */
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/DeleteSharp'
import EditIcon from '@material-ui/icons/EditSharp'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'

/**
 * Import ducks.
 */
import { operations as editorOperations } from '../../organisms/Editor/duck'

/**
 * Import components.
 */
import EdgeEditor from './organisms/EdgeEditor'
import NodeEditor from './organisms/NodeEditor'
import { Wrapper } from './styles'

/**
 * Construct component styles.
 */
const useStyles = makeStyles(theme => ({
  buttonIcon: {
    fontSize: 20,
    marginRight: theme.spacing(1),
  },
  deleteButton: {
    borderRadius: 0,
  },
  editButton: {
    borderRadius: 0,
    margin: theme.spacing(1),
  },
}))

/**
 * Connect component to Redux.
 */
const mapStateToProps = state => ({
  allSelectedEdges: state.editor.present.selectedEdges,
  allSelectedNodes: state.editor.present.selectedNodes,
  currentStageScale: state.editor.present.scaleStage,
  edges: state.editor.present.edges,
  selectedEdge:
    state.editor.present.edges[state.editor.present.selectedEdges[0]],
  selectedNode:
    state.editor.present.nodes[state.editor.present.selectedNodes[0]],
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...editorOperations }, dispatch)

/**
 * Component.
 */
const PropertiesEditor = ({
  allSelectedEdges,
  allSelectedNodes,
  currentStageScale,
  deleteEdge,
  deleteNode,
  deleteShape,
  edges,
  selectedEdge,
  selectedNode,
}) => {
  const classes = useStyles()
  const [editorDialogVisible, makeEditorDialogVisible] = useState(false)

  const toggleEditorDialog = () => makeEditorDialogVisible(!editorDialogVisible)

  const deleteShapes = () => {
    deleteShape()

    for (const node of allSelectedNodes) {
      deleteNode(node)
    }
    for (const edge of allSelectedEdges) {
      deleteEdge(edge)
    }
  }

  return (
    <Wrapper
      currentStageScale={currentStageScale}
      edges={Object.values(edges)}
      selectedEdge={selectedEdge}
      selectedNode={selectedNode}
    >
      <Button
        className={classes.editButton}
        color="secondary"
        size="small"
        variant="contained"
        onClick={toggleEditorDialog}
      >
        <EditIcon className={classes.buttonIcon} />
        Edit
      </Button>

      <IconButton
        className={classes.deleteButton}
        color="secondary"
        size="small"
        variant="contained"
        onClick={deleteShapes}
      >
        <DeleteIcon />
      </IconButton>

      {selectedNode ? (
        <NodeEditor
          editorDialogVisible={editorDialogVisible}
          handleClose={toggleEditorDialog}
        />
      ) : (
        <EdgeEditor
          editorDialogVisible={editorDialogVisible}
          handleClickOpen={toggleEditorDialog}
          handleClose={toggleEditorDialog}
        />
      )}
    </Wrapper>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PropertiesEditor)
