import { Grid, Paper } from '@material-ui/core'
import React from 'react'
import NewMessage from './NewMessage'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const DashboardMessages = () => {
  const matches = useMediaQuery('(min-width:600px)')

  const styles = {
    titleStyles: {
      backgroundColor: 'rgb(0, 119, 114)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50px',
      borderRadius: '10px 10px 0 0',
      color: '#fff'
    },
    messagesStyles: {
      padding: matches ? '20px 30px' : '0'
    }
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper>
          <div style={styles.titleStyles}>
            <h3>Nuevos Mensajes</h3>
          </div>
          <div style={styles.messagesStyles}>
            <NewMessage></NewMessage>
            <NewMessage></NewMessage>
            <NewMessage></NewMessage>
            <NewMessage></NewMessage>
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default DashboardMessages
