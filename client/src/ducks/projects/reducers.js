import { SET_PROJECT_LIST, SELECT_PROJECT_BY_ID } from './types'

export const initialState = {
  projectList: [],
  selectedProjectId: null,
}

const update = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT_LIST:
      return {
        ...state,
        projectList: action.payload,
      }
    case SELECT_PROJECT_BY_ID:
      return {
        ...state,
        selectedProjectId: action.payload,
      }
    default:
      return state
  }
}

export default update
