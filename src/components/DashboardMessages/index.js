import { Grid, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { getChats } from 'requests/createMail'
import NewMessage from './NewMessage'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const DashboardMessages = () => {
  const matches = useMediaQuery('(min-width:600px)')

  const [chats, setChats] = useState([])
  useEffect(() => {
    async function getAllChats() {
      const { success, response, error } = await getChats()
      if (success && response) {
        //console.log(response.data)
        setChats(response.data)
      } else {
        console.log(error)
      }
    }
    getAllChats()
  }, [])
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
            {chats.map((chat, _) => (
              <NewMessage key={_}></NewMessage>
            ))}
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default DashboardMessages
