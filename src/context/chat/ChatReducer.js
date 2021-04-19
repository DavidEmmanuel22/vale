import { types } from '../../types/types'

const initialState = {
  uid: '',
  activeChat: null,
  users: [],
  messages: []
}

export const ChatReducer = (state, action) => {
  switch (action.type) {
    case types.usersLoaded:
      return {
        ...state,
        users: [...action.payload]
      }

    case types.activeChat:
      if (state.activeChat === action.payload) return state

      return {
        ...state,
        activeChat: action.payload,
        messages: []
      }

    case types.newMessage:
      if (
        state.activeChat === action.payload.from ||
        state.activeChat === action.payload.to
      ) {
        return {
          ...state,
          messages: [...state.messages, action.payload]
        }
      } else {
        return state
      }

    case types.loadMessages:
      return {
        ...state,
        messages: [...action.payload]
      }

    case types.clearMessages:
      return initialState

    default:
      return state
  }
}
