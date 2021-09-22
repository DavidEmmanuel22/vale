import React, { useEffect, useState } from 'react'
import { Paper, Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import { valesHistory } from 'requests/allValedores'
import { useLocation } from 'react-router-dom'
import numeral from 'numeral'
import { GRID_DEFAULT_LOCALE_TEXT } from '../../themes/gridText'
import { makeStyles } from '@material-ui/core/styles'

import clsx from 'clsx'
import moment from 'moment'
import 'moment/min/locales'
import { NoRow } from 'assets/Helpers/NoRow'
import _ from 'lodash'
moment.locale('es')

const Historial = () => {
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(true)
    const email = location.state.valedor.email
    const [history, setHistory] = useState([])

    const useStyles = makeStyles(theme => ({
        root: {
            '& .super-app.negative': {
                backgroundColor: 'rgba(157, 255, 118, 0.49)',
                color: '#1a3e72',
                fontWeight: '600'
            },
            '& .super-app.positive': {
                backgroundColor: '#d47483',
                color: '#1a3e72',
                fontWeight: '600'
            }
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            height: `calc(100vh - 190px)`,
            overflowY: 'scroll'
        },
        buttonPaper: {
            padding: theme.spacing(1),
            color: theme.palette.text.secondary,
            marginBottom:"10px",
        },
    }))

    useEffect(() => {
        async function getAllVales() {
            const { success, response, error } = await valesHistory(email)
            if (success && response) {
                setHistory(response.data)
                setIsLoading(false)
            } else {
                //console.log(error)
            }
        }
        getAllVales()
    }, [])

    const columns = [
        { field: '_id', headerName: 'Folio', width: 150, flex: 0.1 },
        {
            field: 'createdAt',
            headerName: 'Fecha',
            width: 250,
            valueFormatter: valedor => moment(valedor.row.createdAt).format('MM/DD/YYYY  hh:mm A')
        },
        {
            field: 'credits',
            headerName: 'Crédito',
            valueFormatter: valedor => numeral(valedor.row.credits).format('$0,0'),
            width: 150
        },
        {
            field: `estatus`,
            headerName: 'Usado',
            valueFormatter: valedor => (valedor.row.estatus === 0 ? 'No' : 'Si'),
            cellClassName: valedor =>
                clsx('super-app', {
                    negative: valedor.row.estatus === 0,
                    positive: valedor.row.estatus >= 1
                }),
            width: 150
        },
        {
            field: 'placeSpent',
            headerName: 'Negocio',
            valueFormatter: valedor => (valedor.row.placeSpent ? valedor.row.placeSpent : 'Vale sin utilizar'),
            width: 150
        }
    ]

    const classes = useStyles()

    return (
        <div style={{ textAlign: 'center' }}>
            {isLoading ? (
                <CircularProgress></CircularProgress>
            ) : (
                <>
                    <Paper style={{ width: '100%' }} className={classes.buttonPaper}>
                        <Typography variant='h5' style={{ paddingTop: '15px', marginBottom: '15px' }}>
                            Historial de vales de {_.get(location, 'state.valedor.email', 'Desconocido')}
                        </Typography>
                    </Paper>
                    <Paper className={classes.paper}>
                        <DataGrid
                            pageSize={6}
                            components={
                                history.length > 0
                                    ? {
                                          Toolbar: GridToolbar
                                      }
                                    : { NoRowsOverlay: NoRow }
                            }
                            localeText={GRID_DEFAULT_LOCALE_TEXT}
                            getRowId={row => row._id}
                            rows={history}
                            columns={columns}
                        />
                    </Paper>
                </>
            )}
        </div>
    )
}

export default Historial
