import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

const AlertPopUp = ({ open, setOpen, type, description }) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="custom-dialog"
      >
        <DialogContent
          dividers
          style={{
            padding: '25px 90px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            minWidth: '400px'
          }}
        >
          {type === 'success' ? (
            <CheckCircleOutlineIcon
              color="primary"
              style={{ fontSize: '60px' }}
            ></CheckCircleOutlineIcon>
          ) : (
            <HighlightOffIcon
              style={{ fontSize: '60px', color: '#be0000' }}
            ></HighlightOffIcon>
          )}

          <h1
            style={{
              color: 'rgb(57, 61, 66)',
              letterSpacing: '2px',
              fontFamily: 'Open Sans, sans-serif'
            }}
          >
            {type === 'success' ? 'Genial!' : 'Error!'}
          </h1>
          <p
            style={{
              color: 'rgb(57, 61, 66)',
              fontSize: '20px',
              textAlign: 'center',
              fontFamily: 'Open Sans, sans-serif',
              margin: '10px 0'
            }}
          >
            {description}
          </p>
          <Button
            onClick={handleClose}
            variant="contained"
            style={{ textTransform: 'capitalize' }}
            color="primary"
          >
            Aceptar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AlertPopUp
