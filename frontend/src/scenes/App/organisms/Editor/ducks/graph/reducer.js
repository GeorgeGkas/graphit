import set from 'lodash/fp/set'
import omit from 'lodash/fp/omit'
import defaults from 'lodash/fp/defaults'
import get from 'lodash/fp/get'
import * as types from './types'

/**
 *  interface Node {
 *    id: string
 *    properties: {
 *      initial: false
 *      name: string
 *    }
 *    ui: {
 *       pos: {
 *         x: string
 *         y: string
 *       }
 *       selected: false
 *    }
 *  }
 *
 *  interface Edge {
 *    id: string
 *    properties: {
 *      weight: number
 *    }
 *    ui: {
 *      connects: {
 *        from: Node['id']
 *        to: Node['id']
 *      }
 *      selected: false
 *    }
 *  }
 *
 */

export const initialState = {
  edges: {},
  nodes: {},
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_NODE:
      return set(`nodes[${action.payload.id}]`, action.payload, state)
    case types.DELETE_NODE:
      return omit(`nodes[${action.payload}]`, state)
    case types.SELECT_NODE:
      return set(`nodes[${action.payload}].ui.selected`, true, state)
    case types.UNSELECT_NODE:
      return set(`nodes[${action.payload}].ui.selected`, false, state)
    case types.UPDATE_NODE_POSITION:
      return set(
        `nodes[${action.payload.id}].ui.pos`,
        action.payload.pos,
        state,
      )
    case types.UPDATE_NODE_PROPERTIES:
      return set(
        `nodes[${action.payload.id}].properties`,
        defaults(
          get(`nodes[${action.payload.id}].properties`, state),
          action.payload.properties,
        ),
        state,
      )
    case types.CREATE_EDGE:
      return set(`edges[${action.payload.id}]`, action.payload, state)
    case types.DELETE_EDGE:
      return omit(`edges[${action.payload}]`, state)
    case types.SELECT_EDGE:
      return set(`edges[${action.payload}].ui.selected`, true, state)
    case types.UNSELECT_EDGE:
      return set(`edges[${action.payload}].ui.selected`, false, state)
    case types.UPDATE_EDGE_PROPERTIES:
      return set(
        `edges[${action.payload.id}].properties`,
        defaults(
          get(`edges[${action.payload.id}].properties`, state),
          action.payload.properties,
        ),
        state,
      )
    default:
      return state
  }
}

export default reducer
