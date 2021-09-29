import React, { useContext, useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { Button, Fab, Paper, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { GRID_DEFAULT_LOCALE_TEXT } from '../../themes/gridText'
import numeral from 'numeral'
import clsx from 'clsx'
import { useHistory } from 'react-router'
import moment from 'moment'
import 'moment/min/locales'
import { NoRow } from 'assets/Helpers/NoRow'
import {
    AttachFileOutlined,
    CastSharp,
    DeleteForeverOutlined,
    DeleteOutlineSharp,
    HistoryOutlined,
    MonetizationOn,
    MonetizationOnOutlined,
    PaymentOutlined
} from '@material-ui/icons'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import { RowProvider } from 'assets/Helpers/RowContext'
import { Alert } from '@material-ui/lab'

moment.locale('es')

export const ValedorTable = ({ vales = [], onEvent }) => {
    const [showActive, setShowActive] = useState(true)

    const useStyle = makeStyles({
        root: {
            '& .super-app.negative': {
                backgroundColor: 'rgb(0, 119, 114)',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            },
            '& .super-app.positive': {
                backgroundColor: '#d47483',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            },
            '& .creditsGiven.negative': {
                color: 'green'
            },
            '& .creditsGiven.positive': {
                color: 'red'
            }
        },
        deleteBtn: {
            background: '#cf1c24',
            '&:hover': {
                background: '#9e0e0e'
            }
        },
        addCreditBtn: {
            background: '#054aaf',
            '&:hover': {
                background: '#083e8f'
            }
        },
        creditBtn: {
            background: '#9032bb',
            '&:hover': {
                background: '#7900ac'
            }
        }
    })

    const columns = [
        {
            field: 'estatus',
            headerName: 'Estatus',
            description: 'Haz click a esta columna para cambiar el estatus',
            sortable: false,
            width: 100,
            disableClickEventBubbling: true,
            valueFormatter: valedor => (valedor.row.estatus === 0 ? 'Activo' : 'Inactivo'),
            cellClassName: valedor =>
                clsx('super-app', {
                    negative: valedor.row.estatus === 0,
                    positive: valedor.row.estatus >= 1
                })
        },
        {
            field: '_id',
            headerName: 'Folio',
            width: 230,
            hide: true
        },
        { field: 'firstName', headerName: 'Nombre', width: 150 },
        {
            field: 'lastName',
            headerName: 'Apellido',
            width: 150
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250
        },
        {
            field: 'credits',
            headerName: 'Crédito Actual',
            valueFormatter: valedor => numeral(valedor.row.credits).format('$0,0'),
            width: 150
        },
        {
            field: `creditsGiven`,
            headerName: 'Deuda',
            valueFormatter: valedor => numeral(valedor.row.creditsGiven).format('$0,0'),
            width: 150,
            cellClassName: valedor =>
                clsx('creditsGiven', {
                    positive: valedor.row.creditsGiven > 0,
                    negative: valedor.row.creditsGiven <= 0
                })
        },
        {
            field: '',
            headerName: 'Acciones',
            sortable: false,
            width: 350,
            renderCell: function render(params) {
                return showActive ? (
                    <>
                        <Tooltip title='Historial del valedor' onClick={() => onEvent('history')}>
                            <Fab color='secondary'>
                                <HistoryOutlined></HistoryOutlined>
                            </Fab>
                        </Tooltip>
                        <Tooltip
                            title='Agregar Credito'
                            style={{ marginLeft: '10px' }}
                            onClick={() => onEvent('credit')}
                        >
                            <Fab color='primary' className={style.addCreditBtn}>
                                <AddOutlinedIcon></AddOutlinedIcon>
                            </Fab>
                        </Tooltip>
                        <Tooltip
                            title='Eliminar Valedor'
                            style={{ marginLeft: '10px' }}
                            onClick={() => onEvent('delete')}
                        >
                            <Fab color='secondary' className={style.deleteBtn}>
                                <DeleteOutlineSharp></DeleteOutlineSharp>
                            </Fab>
                        </Tooltip>
                        <Tooltip
                            title='Registrar Pago'
                            style={{ marginLeft: '10px' }}
                            onClick={() => onEvent('register')}
                        >
                            <Fab color='primary'>
                                <MonetizationOn></MonetizationOn>
                            </Fab>
                        </Tooltip>
                        <Tooltip
                            title='Historial De Pagos'
                            style={{ marginLeft: '10px' }}
                            onClick={() => onEvent('paymentHistory')}
                        >
                            <Fab color='secondary' className={style.creditBtn}>
                                <PaymentOutlined></PaymentOutlined>
                            </Fab>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <Button variant='outlined' color='secondary' onClick={() => onEvent('habilitate')}>
                            Habilitar Valedor
                        </Button>
                    </>
                )
            }
        }
    ]

    const filteredVales = vales.filter(value => {
        if (showActive && value.estatus === 0) {
            return true
        }
        if (!showActive && value.estatus === 1) {
            return true
        }
        return false
    })

    const style = useStyle()

    function onColumnClick(col) {
        console.log(col.field)
        if (col.field === 'estatus') {
            setShowActive(a => !a)
        }
    }

    const NoRowComponent = <Alert severity='info'>¡Ups! Parece que no existen resultados</Alert>

    return (
        <>
            <div style={{ height: '100%', width: '100%' }} className={style.root}>
                <RowProvider component={NoRowComponent}>
                    <DataGrid
                        localeText={GRID_DEFAULT_LOCALE_TEXT}
                        rows={filteredVales}
                        rowHeight={80}
                        getRowId={row => row._id}
                        onRowOver={data => {
                            onEvent('setUser', {
                                user: data.row
                            })
                        }}
                        components={{
                            NoRowsOverlay: NoRow
                        }}
                        onColumnHeaderClick={onColumnClick}
                        columns={columns}
                        pageSize={6}
                    />
                </RowProvider>
            </div>
        </>
    )
}
