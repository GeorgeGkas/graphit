import {
  CHANGE_EDITOR_ACTION_TYPE,
  CREATE_ARROW,
  CREATE_NODE,
  CREATE_SHAPE,
  DELETE_ARROW,
  DELETE_NODE,
  DELETE_SHAPE,
  DRAW_TEMP_ARROW,
  INIT_EDITOR_HISTORY,
  LOAD_STATE,
  MULTI_SELECT,
  REDO_EDITOR_HISTORY,
  SELECT_ARROW,
  SCALE_STAGE,
  SET_INITIAL_NODE,
  SELECT_NODE,
  UNDO_EDITOR_HISTORY,
  UNSELECT_ARROW,
  UNSELECT_NODE,
  UPDATE_ARROW_POSITION,
  UPDATE_ARROW_WEIGHT,
  UPDATE_CURSOR_POSITION,
  UPDATE_NODE_NAME,
  UPDATE_NODE_POSITION_END,
  UPDATE_NODE_POSITION_START,
  UPDATE_STAGE_POSITION,
} from './types'

export const initialState = {
  connected: {},
  cursor: {
    x: 0,
    y: 0,
  },
  drawTempArrow: false,
  editorActionType: 'select',
  initialNode: null,
  isMultiSelect: false,

  nodes: {},
  scaleStage: 1.4641,
  selectedArrow: [],
  selectedNode: [],

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
        selectedNode: [...state.selectedNode, action.payload.id],
      }
    case UNSELECT_NODE:
      return {
        ...state,
        nodes: { ...state.nodes, [action.payload.id]: action.payload },
        selectedNode: state.selectedNode.filter(id => id !== action.payload.id),
      }
    case DELETE_NODE:
      return {
        ...state,
        nodes: delete state.nodes[action.payload] && state.nodes,
        selectedNode: state.selectedNode.filter(id => id !== action.payload),
      }
    case UPDATE_CURSOR_POSITION:
      return {
        ...state,
        cursor: action.payload,
      }
    case DRAW_TEMP_ARROW:
      return {
        ...state,
        drawTempArrow: action.payload,
      }
    case UPDATE_STAGE_POSITION:
      return {
        ...state,
        stage: action.payload,
      }
    case CREATE_ARROW:
      return {
        ...state,
        connected: {
          ...state.connected,
          [action.payload.id]: action.payload,
        },
      }
    case UPDATE_ARROW_POSITION:
      return {
        ...state,
        connected: { ...state.connected, [action.payload.id]: action.payload },
      }
    case SELECT_ARROW:
      return {
        ...state,
        connected: { ...state.connected, [action.payload.id]: action.payload },
        selectedArrow: [...state.selectedArrow, action.payload.id],
      }
    case UNSELECT_ARROW:
      return {
        ...state,
        connected: { ...state.connected, [action.payload.id]: action.payload },
        selectedArrow: state.selectedArrow.filter(
          id => id !== action.payload.id,
        ),
      }
    case DELETE_ARROW:
      return {
        ...state,
        connected: delete state.connected[action.payload] && state.connected,
        selectedArrow: state.selectedArrow.filter(id => id !== action.payload),
      }
    case MULTI_SELECT:
      return {
        ...state,
        isMultiSelect: action.payload,
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
    case UPDATE_ARROW_WEIGHT:
      return {
        ...state,
        connected: {
          ...state.connected,
          [action.payload.id]: {
            ...state.connected[action.payload.id],
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
