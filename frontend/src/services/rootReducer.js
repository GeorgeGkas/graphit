/**
 * Redux root reducer.
 * Import all your Duck Reducers to this file.
 */

import undoable, { includeAction } from 'redux-undo'
import { combineReducers } from 'redux'
import algorithm from '../scenes/App/organisms/EditorBar/duck'
import editor, {
  types as editorTypes,
} from '../scenes/App/organisms/Editor/duck'
import editorComponentsTheme from '../themes/editorComponents.theme'
import user from '../scenes/App/organisms/AppBar/duck'

export default () =>
  combineReducers({
    algorithm,
    editor: undoable(editor, {
      filter: includeAction([
        editorTypes.UPDATE_NODE_POSITION_END,
        editorTypes.CREATE_SHAPE,
        editorTypes.DELETE_SHAPE,
        editor.UPDATE_NODE_NAME,
        editor.UPDATE_EDGE_WEIGHT,
      ]),
      filterStateProps: currenState => {
        return {
          edges: Object.values(currenState.edges)
            .map(edge => ({
              ...edge,
              stroke: editorComponentsTheme.edge.neutral.color,
            }))
            .reduce((obj, edge) => ({ ...obj, [edge.id]: edge }), {}),
          cursor: currenState.cursor,
          drawTempArrow: false,
          editorActionType: 'select',
          isMultiSelect: false,
          nodes: Object.values(currenState.nodes)
            .map(node => ({
              ...node,
              fill: editorComponentsTheme.node.neutral.color,
            }))
            .reduce((obj, node) => ({ ...obj, [node.id]: node }), {}),
          scaleStage: currenState.scaleStage,
          selectedEdge: [],
          selectedNode: [],
          stage: currenState.stage,
        }
      },
      initTypes: [editorTypes.INIT_EDITOR_HISTORY],
      limit: 100,
      redoType: editorTypes.REDO_EDITOR_HISTORY,
      undoType: editorTypes.UNDO_EDITOR_HISTORY,
    }),
    user,
  })
