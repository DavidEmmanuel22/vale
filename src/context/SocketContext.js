import React, { useContext, useEffect, createContext } from 'react'
import { useSocket } from '../hooks/UseSocket'
import { types } from '../types/types'
//import { AuthContext } from './AuthContext'
import { ChatContext } from './chat/ChatContext'

export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
  const { socket, online, connectSocket, disconnectSocket } = useSocket(
    'http://localhost:8080'
  )
  //const { auth } = useContext(AuthContext)
  //const { dispatch } = useContext(ChatContext)

  //   useEffect(() => {
  //     socket?.on('personal-message', (message) => {
  //       dispatch({
  //         type: types.newMessage,
  //         payload: message
  //       })
  //       scrollToBottom('messages_history')
  //     })
  //   }, [socket, dispatch])

  useEffect(() => {
    //  if (auth.logged) {
    connectSocket()
    //}
  }, [connectSocket])

  //   useEffect(() => {
  //     if (!auth.logged) {
  //       disconnectSocket()
  //     }
  //   }, [auth, disconnectSocket])

  //   useEffect(() => {
  //     socket?.on('users-list', (users) => {
  //       dispatch({
  //         type: types.usersLoaded,
  //         payload: users
  //       })
  //     })
  //   }, [socket, dispatch])

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  )
}
