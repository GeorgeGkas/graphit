/**
 * Redux root reducer.
 * Import all your Duck Reducers to this file.
 */

import set from 'lodash/fp/set'
import undoable, { includeAction } from 'redux-undo'
import mapValues from 'lodash/fp/mapValues'
import { combineReducers } from 'redux'
import algorithm from '../scenes/App/organisms/EditorBar/duck'
import editor from '../scenes/App/organisms/Editor/ducks/editor'
import graph, {
  types as graphTypes,
} from '../scenes/App/organisms/Editor/ducks/graph'
import user from '../ducks/user'

export default () =>
  combineReducers({
    algorithm,
    editor,
    graph: undoable(graph, {
      filter: includeAction([
        graphTypes.CREATE_EDGE,
        graphTypes.CREATE_NODE,
        graphTypes.DELETE_EDGE,
        graphTypes.DELETE_NODE,
        graphTypes.UPDATE_EDGE_PROPERTIES,
        graphTypes.UPDATE_NODE_POSITION_END,
        graphTypes.UPDATE_NODE_PROPERTIES,
      ]),
      filterStateProps: currentState => {
        const unselectAll = mapValues(set('ui.selected', false))

        return {
          edges: unselectAll(currentState.edges),
          nodes: unselectAll(currentState.nodes),
        }
      },
      initTypes: [graphTypes.INIT_GRAPH_HISTORY],
      limit: 100,
      redoType: graphTypes.REDO_GRAPH_HISTORY,
      undoType: graphTypes.UNDO_GRAPH_HISTORY,
    }),
    user,
  })
