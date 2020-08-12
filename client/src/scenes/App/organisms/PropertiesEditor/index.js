import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import { withFirebase } from '../../../../providers/Firebase'
import {
  operations as graphOperations,
  selectors as graphSelectors,
} from '../../ducks/graph'
import PencilIcon from './images/pencil.svg'
import TrashIcon from './images/trash.svg'
import EdgeInputEditor from './organisms/EdgeInputEditor'
import EdgeWeightEditor from './organisms/EdgeWeightEditor'
import NodeEditor from './organisms/NodeEditor'
import { Wrapper } from './styles'

const useStyles = makeStyles(theme => ({
  button: {
    background: '#ec407a',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    '&:hover': {
      background: '#ad1457',
    },
  },
  toolbar: {
    padding: 0,
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
  firebase,
  nodes,
  selectedEdge,
  selectedNode,
  stageScale,
}) => {
  const classes = useStyles()

  const [editorDialogVisible, makeEditorDialogVisible] = React.useState(false)

  const toggleEditorDialog = () => makeEditorDialogVisible(!editorDialogVisible)

  const deleteShape = () => {
    if (selectedEdge) {
      deleteEdge(selectedEdge.id)
      firebase.analytics.logEvent('app_delete_edge')
    } else if (selectedNode) {
      deleteNode(selectedNode.id)
      firebase.analytics.logEvent('app_delete_node')
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
      <Toolbar className={classes.toolbar}>
        <Grid container direction="row" justify="center">
          <Grid item xs={12} style={{ paddingBottom: '15px' }}>
            <Tooltip title="edit">
              <IconButton
                className={classes.button}
                onClick={() => {
                  toggleEditorDialog()
                  firebase.analytics.logEvent(
                    selectedNode ? 'app_edit_node' : 'app_edit_edge',
                  )
                }}
              >
                <img alt="edit icon" src={PencilIcon} width="16" height="16" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Tooltip title="delete">
              <IconButton className={classes.button} onClick={deleteShape}>
                <img alt="delete icon" src={TrashIcon} width="16" height="16" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>

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

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(PropertiesEditor)
