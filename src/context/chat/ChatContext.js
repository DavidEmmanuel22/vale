import React, { createContext, useReducer } from 'react'
import { ChatReducer } from './ChatReducer'

export const ChatContext = createContext()

const initialState = {
  uid: '',
  activeChat: null,
  users: [],
  messages: []
}

export const ChatProvider = ({ children }) => {
  const [chatState, dispatch] = useReducer(ChatReducer, initialState)
  return (
    <ChatContext.Provider value={{ chatState, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
