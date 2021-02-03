import React from 'react'
import { Dialog, DialogContent } from '@material-ui/core'
import ActionButton from 'components/ActionButton/ActionButton'
import CloseIcon from '@material-ui/icons/Close'
import Styles from './Styles'

const DialogPopup = (props) => {
  const classes = Styles()
  const { children, openDialog, setOpenDialog } = props

  return (
    <Dialog open={openDialog} maxWidth="md">
      <DialogContent
        className={`${classes.MuiDialogContentRoot} ${classes.MuiDialogContentroot}`}
      >
        <div>
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

export default DialogPopup
