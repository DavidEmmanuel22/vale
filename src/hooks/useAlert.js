import React from 'react'
import Alert from '@material-ui/lab/Alert'

const useAlert = (
  initialColor = 'success',
  initialText = '',
  initialShow = false
) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'success':
        return {
          ...state,
          severity: action.type,
          content: action.payload.content,
          show: action.payload.show || state.show
        }
      case 'info':
        return {
          ...state,
          severity: action.type,
          content: action.payload.content,
          show: action.payload.show || state.show
        }
      case 'warning':
        return {
          ...state,
          severity: action.type,
          content: action.payload.content,
          show: action.payload.show || state.show
        }
      case 'error':
        return {
          ...state,
          severity: action.type,
          content: action.payload.content,
          show: action.payload.show || state.show
        }
      case 'show':
        return {
          ...state,
          show: action.payload.show
        }
      default:
        throw new Error(`The action < ${action.type} > is not defined`)
    }
  }

  const [alert, dispatchAlert] = React.useReducer(reducer, {
    severity: initialColor,
    content: initialText,
    show: initialShow
  })

  return [alert, dispatchAlert]
}

export default useAlert
