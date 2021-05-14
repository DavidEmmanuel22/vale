import { Grid, Paper } from '@material-ui/core'
import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { getChats } from 'requests/createMail'
import NewMessage from './NewMessage'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Mail } from '../../pages/Mail/Mail'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import IconButton from '@material-ui/core/IconButton'
import CachedIcon from '@material-ui/icons/Cached'
import Tooltip from '@material-ui/core/Tooltip'
import { UserContext } from 'context/userContext'
import moment from 'moment'
import 'moment/min/locales'
moment.locale('es')

const DashboardMessages = ({ showAll }) => {
  const [chats, setChats] = useState([])
  const history = useHistory()
  const { user } = useContext(UserContext)
  const [showMessages, setShowMessages] = useState(false)
  const [loading, setLoading] = useState(false)

  const sortedChats = chats.sort((a, b) => {
    return new Date(b.chats.lastDateMessage) - new Date(a.chats.lastDateMessage)
  })
  useEffect(() => {
    async function getAllChats() {
      const { success, response, error } = await getChats()
      if (success && response) {
        //console.log(response.data)
        setChats(response.data)
        setLoading(true)
      } else {
        //console.log(error)
      }
    }
    getAllChats()
  }, [setChats])

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
      padding: '20px 30px'
    }
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper>
          <div style={styles.titleStyles}>
            {showMessages ? (
              <Tooltip
                color="secondary"
                onClick={() => setShowMessages(!showMessages)}
                title="Mensajes"
              >
                <IconButton aria-label="delete">
                  <ArrowBackIosIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip
                color="secondary"
                onClick={() => window.location.reload(true)}
                title="Recargar"
              >
                <IconButton aria-label="delete">
                  <CachedIcon />
                </IconButton>
              </Tooltip>
            )}
            <h3>{`${
              !showAll ? `Mensajes: ${chats.length}` : `Nuevos Mensajes`
            }`}</h3>
          </div>
          {showMessages ? (
            <Mail />
          ) : (
            <div style={styles.messagesStyles}>
              {!loading ? (
                <CircularProgress size={24} />
              ) : (
                sortedChats
                  .slice(0, `${!showAll ? chats.length : 6}`)
                  .map((chat, _) => (
                    <NewMessage
                      clicked={() => {
                        history.push({
                          state: { email: user.email }
                        })
                        localStorage.setItem('idChat', chat.chats._id)
                        setShowMessages(!showMessages)
                      }}
                      chat={chat.chats}
                      key={_}
                    ></NewMessage>
                  ))
              )}
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  )
}

export default DashboardMessages
