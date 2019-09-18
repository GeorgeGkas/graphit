/**
 * Redux root reducer.
 * Import all your Duck Reducers to this file.
 */

import { combineReducers } from 'redux'

import undoable, { includeAction } from 'redux-undo'
import editor, {
  types as editorTypes,
} from '../scenes/App/organisms/Editor/duck'
import algorithm from '../scenes/App/organisms/EditorBar/duck'
import user from '../scenes/App/organisms/AppBar/duck'
import editorComponentsTheme from '../themes/editorComponents.theme'

export default () =>
  combineReducers({
    editor: undoable(editor, {
      limit: 100,
      undoType: editorTypes.UNDO_EDITOR_HISTORY,
      redoType: editorTypes.REDO_EDITOR_HISTORY,
      initTypes: [editorTypes.INIT_EDITOR_HISTORY],
      filterStateProps: currenState => {
        return {
          connected: Object.values(currenState.connected)
            .map(arrow => ({
              ...arrow,
              stroke: editorComponentsTheme.edge.neutral.color,
            }))
            .reduce((obj, arrow) => ({ ...obj, [arrow.id]: arrow }), {}),
          nodes: Object.values(currenState.nodes)
            .map(node => ({
              ...node,
              fill: editorComponentsTheme.node.neutral.color,
            }))
            .reduce((obj, node) => ({ ...obj, [node.id]: node }), {}),
          stage: currenState.stage,
          selectedNode: [],
          selectedArrow: [],
          cursor: currenState.cursor,
          drawTempArrow: false,
          isMultiSelect: false,
          scaleStage: currenState.scaleStage,
          editorActionType: 'select',
        }
      },
      filter: includeAction([
        editorTypes.UPDATE_NODE_POSITION_END,
        editorTypes.CREATE_SHAPE,
        editorTypes.DELETE_SHAPE,
        editor.UPDATE_NODE_NAME,
        editor.UPDATE_ARROW_WEIGHT,
      ]),
    }),
    algorithm,
    user,
  })
