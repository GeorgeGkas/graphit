import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/DeleteSharp'
import EditIcon from '@material-ui/icons/EditSharp'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  operations as graphOperations,
  selectors as graphSelectors,
} from '../../ducks/graph'
import EdgeInputEditor from './organisms/EdgeInputEditor'
import EdgeWeightEditor from './organisms/EdgeWeightEditor'
import NodeEditor from './organisms/NodeEditor'
import { Wrapper } from './styles'

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

const mapStateToProps = state => ({
  algorithm: state.graph.present.metadata.algorithm,
  edges: state.graph.present.edges,
  nodes: state.graph.present.nodes,
  selectedEdge: graphSelectors.getSelected(state.graph.present.edges),
  selectedNode: graphSelectors.getSelected(state.graph.present.nodes),
  stageScale: state.editor.stage.scale,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...graphOperations }, dispatch)

const PropertiesEditor = ({
  algorithm,
  deleteEdge,
  deleteNode,
  edges,
  nodes,
  selectedEdge,
  selectedNode,
  stageScale,
}) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const [editorDialogVisible, makeEditorDialogVisible] = React.useState(false)

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
        {t('app.properties_editor.edit')}
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
      ) : algorithm === 'Automata' ? (
        <EdgeInputEditor
          editorDialogVisible={editorDialogVisible}
          handleClickOpen={toggleEditorDialog}
          handleClose={toggleEditorDialog}
        />
      ) : (
        <EdgeWeightEditor
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
