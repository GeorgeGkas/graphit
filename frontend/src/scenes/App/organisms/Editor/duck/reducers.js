import {
  CHANGE_EDITOR_ACTION_TYPE,
  CREATE_EDGE,
  CREATE_NODE,
  CREATE_SHAPE,
  DELETE_EDGE,
  DELETE_NODE,
  DELETE_SHAPE,
  INIT_EDITOR_HISTORY,
  LOAD_STATE,
  REDO_EDITOR_HISTORY,
  SELECT_EDGE,
  SCALE_STAGE,
  SET_INITIAL_NODE,
  SELECT_NODE,
  UNDO_EDITOR_HISTORY,
  UNSELECT_EDGE,
  UNSELECT_NODE,
  UPDATE_EDGE_POSITION,
  UPDATE_EDGE_WEIGHT,
  UPDATE_CURSOR_POSITION,
  UPDATE_NODE_NAME,
  UPDATE_NODE_POSITION_END,
  UPDATE_NODE_POSITION_START,
  UPDATE_STAGE_POSITION,
} from './types'

export const initialState = {
  cursor: {
    x: 0,
    y: 0,
  },
  edges: {},
  editorActionType: 'select',
  initialNode: null,

  nodes: {},
  scaleStage: 1.4641,
  selectedEdges: [],
  selectedNodes: [],

  stage: {
    x: 0,
    y: 0,
  },
}

const update = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NODE:
    case UPDATE_NODE_POSITION_START:
      return {
        ...state,
        nodes: { ...state.nodes, [action.payload.id]: action.payload },
      }
    case SELECT_NODE:
      return {
        ...state,
        nodes: { ...state.nodes, [action.payload.id]: action.payload },
        selectedNodes: [...state.selectedNodes, action.payload.id],
      }
    case UNSELECT_NODE:
      return {
        ...state,
        nodes: { ...state.nodes, [action.payload.id]: action.payload },
        selectedNodes: state.selectedNodes.filter(
          id => id !== action.payload.id,
        ),
      }
    case DELETE_NODE:
      return {
        ...state,
        nodes: delete state.nodes[action.payload] && state.nodes,
        selectedNodes: state.selectedNodes.filter(id => id !== action.payload),
      }
    case UPDATE_CURSOR_POSITION:
      return {
        ...state,
        cursor: action.payload,
      }
    case UPDATE_STAGE_POSITION:
      return {
        ...state,
        stage: action.payload,
      }
    case CREATE_EDGE:
      return {
        ...state,
        edges: {
          ...state.edges,
          [action.payload.id]: action.payload,
        },
      }
    case UPDATE_EDGE_POSITION:
      return {
        ...state,
        edges: { ...state.edges, [action.payload.id]: action.payload },
      }
    case SELECT_EDGE:
      return {
        ...state,
        edges: { ...state.edges, [action.payload.id]: action.payload },
        selectedEdges: [...state.selectedEdges, action.payload.id],
      }
    case UNSELECT_EDGE:
      return {
        ...state,
        edges: { ...state.edges, [action.payload.id]: action.payload },
        selectedEdges: state.selectedEdges.filter(
          id => id !== action.payload.id,
        ),
      }
    case DELETE_EDGE:
      return {
        ...state,
        edges: delete state.edges[action.payload] && state.edges,
        selectedEdges: state.selectedEdges.filter(id => id !== action.payload),
      }
    case SCALE_STAGE:
      return {
        ...state,
        scaleStage: action.payload,
      }
    case CHANGE_EDITOR_ACTION_TYPE:
      return {
        ...state,
        editorActionType: action.payload,
      }
    case LOAD_STATE:
      return {
        ...action.payload,
      }
    case UPDATE_NODE_NAME:
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [action.payload.id]: {
            ...state.nodes[action.payload.id],
            name: action.payload.name,
          },
        },
      }
    case UPDATE_EDGE_WEIGHT:
      return {
        ...state,
        edges: {
          ...state.edges,
          [action.payload.id]: {
            ...state.edges[action.payload.id],
            weight: action.payload.weight,
          },
        },
      }
    case SET_INITIAL_NODE:
      return {
        ...state,
        initialNode: action.payload,
      }
    case UPDATE_NODE_POSITION_END:
    case DELETE_SHAPE:
    case CREATE_SHAPE:
    case UNDO_EDITOR_HISTORY:
    case REDO_EDITOR_HISTORY:
    case INIT_EDITOR_HISTORY:
    default:
      return state
  }
}

export default update
