/* eslint-disable no-unneeded-ternary */
import { Grid, Paper, TextField, InputAdornment } from '@material-ui/core'
import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { countMessagesNotRead, getChats, readMessage } from 'requests/createMail'
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
import SearchIcon from '@material-ui/icons/Search'
import './DashboardMessages.css'

moment.locale('es')

const DashboardMessages = ({ showAll }) => {
    const [chats, setChats] = useState([])
    const history = useHistory()
    const { user } = useContext(UserContext)
    const [showMessages, setShowMessages] = useState(false)
    const [loading, setLoading] = useState(false)
    const [read, setRead] = useState(0)
    const [searchMessage, setSearchMessage] = useState('')

    const [notReadMessage, setNotReadMessage] = useState('')
    useEffect(() => {
        async function notReadMessage() {
            const { success, response, error } = await countMessagesNotRead()
            if (success && response) {
                setNotReadMessage(response.data)
            } else {
                //console.log(error)
            }
        }
        notReadMessage()
    }, [chats])

    const sortedChats = chats.sort((a, b) => {
        return new Date(b.chats.lastDateMessage) - new Date(a.chats.lastDateMessage)
    })

    const newMessage = sortedChats.filter(readed => {
        if (readed.chats.readAdmin && showAll) {
            return null
        }
        if (!readed.chats.lastMessage) {
            return null
        }

        return readed
    })

    const filterMessages = newMessage.filter((message, index) => {
        if (!message.chats.name || !message.chats.from) {
            return null
        } else {
            if (
                message.chats.name.toLowerCase().includes(searchMessage.toLowerCase()) ||
                message.chats.from.toLowerCase().includes(searchMessage.toLowerCase())
            ) {
                return true
            } else {
                return false
            }
        }
    })

    const showAllMessages = filterMessages.sort((a, b) => {
        return !b.chats.readAdmin - !a.chats.readAdmin
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
            flexWrap: 'wrap',
            minHeight: '60px',
            borderRadius: '10px 10px 0 0',
            color: '#fff',
            position: 'sticky',
            top: '80px',
            zIndex: '100',
            marginTop: '-10px'
        },
        messagesStyles: {
            padding: '20px 30px'
        }
    }

    return (
        <Paper style={{ borderRadius: '10px 10px 0px 0px' /*backgroundColor: "red",*/ }}>
            <div style={styles.titleStyles}>
                {showMessages ? (
                    <Tooltip color='secondary' onClick={() => setShowMessages(!showMessages)} title='Mensajes'>
                        <IconButton aria-label='delete'>
                            <ArrowBackIosIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <TextField
                            placeholder='Buscar Mensaje...'
                            className='dashboardMessages__searchInput'
                            inputProps={{
                                maxLength: 30
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start' className='MuiInputAdornment-root'>
                                        <SearchIcon fontSize='large' />
                                    </InputAdornment>
                                )
                            }}
                            value={searchMessage}
                            onChange={e => setSearchMessage(e.target.value)}
                        />
                    </div>
                )}

                <h2>
                    <Tooltip color='secondary' onClick={() => window.location.reload(true)} title='Recargar'>
                        <IconButton aria-label='delete'>
                            <CachedIcon />
                        </IconButton>
                    </Tooltip>
                    {`${
                        isEmpty
                            ? 'Sin Nuevos Mensajes'
                            : !showAll
                            ? `
                Nuevos Mensajes: ${notReadMessage}`
                            : `Nuevos Mensajes`
                    }`}
                </h2>
            </div>
            {showMessages ? (
                <Mail />
            ) : (
                <div style={styles.messagesStyles}>
                    {!loading ? (
                        <CircularProgress size={24} />
                    ) : (
                        showAllMessages /*.filter((chat) => showAll ? showAll : !chat.chats.readAdmin)*/
                            .map((chat, _) => (
                                <div key={_}>
                                    <NewMessage
                                        clicked={() => {
                                            history.push({
                                                state: { email: user.email }
                                            })
                                            localStorage.setItem('idChat', chat.chats._id)
                                            setShowMessages(!showMessages)
                                        }}
                                        chat={chat.chats}
                                    ></NewMessage>
                                </div>
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
                                        width: '75%',
                                        opacity: '66%'
                                    }}
                                />
                            </div>
                        </>
                    ) : null}
                </div>
            )}
        </Paper>
    )
}

export default DashboardMessages
