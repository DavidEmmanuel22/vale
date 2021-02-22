import React, {
  useCallback,
  useEffect,
  useState,
  createContext,
  Fragment
} from 'react'
import { Alert } from '@material-ui/lab'
import Snackbar from '@material-ui/core/Snackbar'

const ToastContext = createContext()

export default ToastContext

export function ToastContextProvider({ children }) {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    if (toasts.length > 0) {
      const timeout = setTimeout(
        () => setToasts((toasts) => toasts.slice(1)),
        3000
      )

      return () => clearTimeout(timeout)
    }
  }, [toasts])

  const addToast = useCallback(
    (toast) => setToasts((toasts) => [...toasts, toast]),
    [setToasts]
  )

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <Fragment>
        {toasts.map(({ severity, message }, index) => (
          <Snackbar open key={index}>
            <Alert variant="filled" severity={severity}>
              {message}
            </Alert>
          </Snackbar>
        ))}
      </Fragment>
    </ToastContext.Provider>
  )
}
