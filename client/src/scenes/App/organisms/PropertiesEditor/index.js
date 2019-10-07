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
import {
  operations as graphOperations,
  selectors as graphSelectors,
} from '../../organisms/Editor/ducks/graph'

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
  edges: state.graph.present.edges,
  nodes: state.graph.present.nodes,
  selectedEdge: graphSelectors.getSelected(state.graph.present.edges),
  selectedNode: graphSelectors.getSelected(state.graph.present.nodes),
  stageScale: state.editor.stage.scale,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...graphOperations }, dispatch)

/**
 * Component.
 */
const PropertiesEditor = ({
  deleteEdge,
  deleteNode,
  edges,
  nodes,
  selectedEdge,
  selectedNode,
  stageScale,
}) => {
  const classes = useStyles()
  const [editorDialogVisible, makeEditorDialogVisible] = useState(false)

  const toggleEditorDialog = () => makeEditorDialogVisible(!editorDialogVisible)

  const deleteShape = () => {
    if (selectedEdge) {
      deleteEdge(selectedEdge.id)
    } else if (selectedNode) {
      deleteNode(selectedNode.id)
    } else {
      /**
       * Should not be reached!
       */
      throw new Error('Properties editor does not match any selected shape.')
    }
  }

  return (
    <Wrapper
      currentStageScale={stageScale}
      edges={edges}
      selectedNode={selectedNode}
      selectedResolvedEdge={graphSelectors.resolveEdgePath(selectedEdge, nodes)}
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
        onClick={deleteShape}
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
