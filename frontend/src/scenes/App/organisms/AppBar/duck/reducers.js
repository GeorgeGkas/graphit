import { SIGN_IN, SIGN_OUT, SELECT_PROJECT } from './types'

export const initialState = {
  isSignIn: false,
  profile: {
    email: '',
    id: '',
    imageUrl: '',

    name: '',
  },
  selectedProjectId: null,
}

const update = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignIn: true,
        profile: action.payload,
      }
    case SIGN_OUT:
      return initialState
    case SELECT_PROJECT:
      return {
        ...state,
        selectedProjectId: action.payload,
      }
    default:
      return state
  }
}

export default update
