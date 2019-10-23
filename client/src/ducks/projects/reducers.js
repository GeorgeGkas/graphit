import { SET_PROJECT_LIST } from './types'

export const initialState = {
  projectList: [],
}

const update = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT_LIST:
      return {
        ...state,
        projectList: action.payload,
      }
    default:
      return state
  }
}

export default update
