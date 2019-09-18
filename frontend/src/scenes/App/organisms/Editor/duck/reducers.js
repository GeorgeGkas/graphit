import {
  CREATE_NODE,
  SELECT_NODE,
  DELETE_NODE,
  UPDATE_CURSOR_POSITION,
  UPDATE_NODE_POSITION_START,
  DRAW_TEMP_ARROW,
  UPDATE_STAGE_POSITION,
  CREATE_ARROW,
  UPDATE_ARROW_POSITION,
  SELECT_ARROW,
  DELETE_ARROW,
  UNSELECT_NODE,
  UNSELECT_ARROW,
  MULTI_SELECT,
  UPDATE_NODE_POSITION_END,
  DELETE_SHAPE,
  CREATE_SHAPE,
  SCALE_STAGE,
  CHANGE_EDITOR_ACTION_TYPE,
  LOAD_STATE,
  UPDATE_NODE_NAME,
  UPDATE_ARROW_WEIGHT,
  UNDO_EDITOR_HISTORY,
  REDO_EDITOR_HISTORY,
  INIT_EDITOR_HISTORY,
  SET_INITIAL_NODE,
} from './types'

export const initialState = {
  nodes: {},
  selectedNode: [],
  selectedArrow: [],
  cursor: {
    x: 0,
    y: 0,
  },
  stage: {
    x: 0,
    y: 0,
  },
  drawTempArrow: false,
  connected: {},
  isMultiSelect: false,
  scaleStage: 1.4641,
  editorActionType: 'select',
  initialNode: null,
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
