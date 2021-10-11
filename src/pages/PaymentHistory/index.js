import React, { useEffect, useState } from 'react'
import { IconButton, Paper, Popover, Tooltip, Typography } from '@material-ui/core'
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
import { GeneralPaymentsTable } from 'components/Tables/GeneralPaymenjsTable'
import { FilterList } from '@material-ui/icons'
import DateRange from 'components/filters/DateRangePicker'
moment.locale('es')

const PaymentHistoryPage = () => {
    const useStyles = makeStyles(theme => ({
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            height: `calc(100vh - 190px)`,
            overflowY: 'scroll'
        },
        buttonPaper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }
    }))

    const classes = useStyles()

    const [anchorEl, setAnchorEl] = React.useState(null)
    const [state, setState] = React.useState([
        {
            startDate: null,
            endDate: null,
            key: 'selection'
        }
    ])

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    function handleSelectRange(item) {
        setState([item.selection])
    }

    function handleSelectAll() {
        console.log('select all')
        setState([
            {
                startDate: null,
                endDate: null,
                key: 'selection'
            }
        ])
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const noRowsComponent = (
        <Alert severity='info'>¡Ups! Parece que no existe un historial de compras para las fechas seleccionadas</Alert>
    )

    return (
        <div style={{ textAlign: 'center' }}>
            <Paper className={classes.buttonPaper}>
                <Typography variant='h6'>Historial de compras</Typography>
                <Tooltip title='Mostrar filtros' onClick={handleClick} style={{ marginRight: '30px' }}>
                    <IconButton aria-describedby={id}>
                        <FilterList color='primary'></FilterList>
                    </IconButton>
                </Tooltip>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    style={{ overflow: 'scroll' }}
                >
                    <DateRange date={state} onRangeChange={handleSelectRange} onSelectAll={handleSelectAll}></DateRange>
                </Popover>
            </Paper>
            <Paper className={classes.paper}>
                <RowProvider component={noRowsComponent}>
                    <GeneralPaymentsTable dateRange={state}></GeneralPaymentsTable>
                </RowProvider>
            </Paper>
        </div>
    )
}

export default PaymentHistoryPage
