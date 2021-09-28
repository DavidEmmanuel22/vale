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
import _ from 'lodash'
import { NoRow } from 'assets/Helpers/NoRow'
import { RowProvider } from 'assets/Helpers/RowContext'
import { Alert } from '@material-ui/lab'
moment.locale('es')

const PaymentHistoryPage = () => {
    const [isLoading, setIsLoading] = useState(false)

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
            height: `calc(100vh - 180px)`,
            overflowY: 'scroll'
        },
        buttonPaper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
            marginBottom: '10px'
        }
    }))

    useEffect(() => {
        /*async function getAllVales() {
            const { success, response, error } = await valesHistory(email)
            if (success && response) {
                setHistory(response.data)
                setIsLoading(false)
            } else {
                //console.log(error)
            }
        }
        getAllVales()*/
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

    const NoRowComponent = <Alert severity='info'>¡Ups! Parece que no hay resultados</Alert>

    return (
        <div style={{ textAlign: 'center' }}>
            <Paper style={{ width: '100%' }} className={classes.buttonPaper}>
                <Typography variant='h5'>Historial de compras</Typography>
            </Paper>
            {isLoading ? (
                <CircularProgress></CircularProgress>
            ) : (
                <>
                    <Paper className={classes.paper}>
                        <RowProvider component={NoRowComponent}>
                            <DataGrid
                                pageSize={6}
                                components={{
                                    NoRowsOverlay: NoRow
                                }}
                                localeText={GRID_DEFAULT_LOCALE_TEXT}
                                getRowId={row => row._id}
                                rows={[]}
                                columns={columns}
                            />
                        </RowProvider>
                    </Paper>
                </>
            )}
        </div>
    )
}

export default PaymentHistoryPage
