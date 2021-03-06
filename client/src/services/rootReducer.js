/**
 * Redux root reducer.
 * Import all your Duck Reducers to this file.
 */

import mapValues from 'lodash/fp/mapValues'
import set from 'lodash/fp/set'
import { combineReducers } from 'redux'
import undoable, { includeAction } from 'redux-undo'

import projects from '../ducks/projects'
import algorithm from '../scenes/App/ducks/algorithm'
import editor from '../scenes/App/ducks/editor'
import graph, { types as graphTypes } from '../scenes/App/ducks/graph'
import tutorial from '../scenes/App/ducks/tutorial'

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
          metadata: currentState.metadata,
          nodes: unselectAll(currentState.nodes),
        }
      },
      initTypes: [graphTypes.INIT_GRAPH_HISTORY],
      limit: 100,
      redoType: graphTypes.REDO_GRAPH_HISTORY,
      undoType: graphTypes.UNDO_GRAPH_HISTORY,
    }),
    projects,
    tutorial,
  })
