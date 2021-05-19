import { Grid, Paper } from '@material-ui/core'
import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { getChats, readMessage } from 'requests/createMail'
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
import noMessage from '../../assets/Index/noMessage.svg'
moment.locale('es')

const DashboardMessages = ({ showAll }) => {
  const [chats, setChats] = useState([])
  const history = useHistory()
  const { user } = useContext(UserContext)
  const [showMessages, setShowMessages] = useState(false)
  const [loading, setLoading] = useState(false)
  const [read, setRead] = useState(0)

  const sortedChats = chats.sort((a, b) => {
    return new Date(b.chats.lastDateMessage) - new Date(a.chats.lastDateMessage)
  })

  const newMessage = sortedChats.filter((readed) => {
    if (readed.chats.readAdmin && showAll) {
      return null
    }
    return readed
  })

  const isEmpty = newMessage.length === 0 ? 1 : 0
  //console.log(isEmpty)
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
    if (!showMessages) {
      getAllChats()
    }
  }, [loading, showMessages])

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
        <Paper style={{ borderRadius: '10px 10px 0px 0px' }}>
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
            <h2>{`${
              isEmpty
                ? 'Sin Nuevos Mensajes'
                : !showAll
                ? `Mensajes: ${chats.length}`
                : `Nuevos Mensajes`
            }`}</h2>
          </div>
          {showMessages ? (
            <Mail />
          ) : (
            <div style={styles.messagesStyles}>
              {!loading ? (
                <CircularProgress size={24} />
              ) : (
                newMessage
                  .slice(0, `${!showAll ? chats.length : 6}`)
                  .map((chat, _) => (
                    <>
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
                    </>
                  ))
              )}
              {isEmpty && loading ? (
                <>
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src={noMessage}
                      style={{
                        padding: '6em',
                        textAlign: 'center',
                        width: '100%',
                        opacity: '66%'
                      }}
                    />
                  </div>
                </>
              ) : null}
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  )
}

export default DashboardMessages
