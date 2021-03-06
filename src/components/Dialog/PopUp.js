import React from 'react'
import { Dialog, DialogContent } from '@material-ui/core'
import ActionButton from 'components/ActionButton/ActionButton'
import CloseIcon from '@material-ui/icons/Close'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Styles from './Styles'

const Popup = (props) => {
  const classes = Styles()
  const { children, openDialog, setOpenDialog } = props
  const matches = useMediaQuery('(max-width:600px)')

  return (
    <Dialog open={openDialog} maxWidth="md">
      <DialogContent
        className={`${classes.MuiDialogContentRoot} ${classes.MuiDialogContentroot}`}
      >
        <div style={{ position: `${matches ? 'absolute' : ''}` }}>
          <ActionButton
            onClick={() => {
              setOpenDialog(false)
            }}
          >
            <CloseIcon />
          </ActionButton>
        </div>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Popup
