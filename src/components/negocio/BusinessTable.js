import React, { useContext, useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { Button, Fab, Paper, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { GRID_DEFAULT_LOCALE_TEXT } from '../../themes/gridText'
import numeral from 'numeral'
import clsx from 'clsx'
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
    EditIcon,
    Room
} from '@material-ui/icons'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import _ from 'lodash'
import { RowContext, RowProvider } from 'assets/Helpers/RowContext'
import { Alert } from '@material-ui/lab'

moment.locale('es')

export const BusinessTable = ({ businessList = [], onEvent }) => {
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
            valueFormatter: business => (business.row.estatus === 0 ? 'Activo' : 'Inactivo'),
            cellClassName: business =>
                clsx('super-app', {
                    negative: business.row.estatus === 0,
                    positive: business.row.estatus >= 1
                })
        },
        {
            field: '_id',
            headerName: 'Folio',
            width: 230,
            hide: true
        },
        { field: 'bussinesName', headerName: 'Nombre Del Negocio', width: 200 },
        {
            field: 'bussinesRfc',
            headerName: 'RFC Del Negocio',
            width: 150
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250
        },
        {
            field: `x`,
            headerName: 'Deuda',
            valueFormatter: business => numeral(40000).format('$0,0'),
            width: 150,
            cellClassName: business =>
                clsx('creditsGiven', {
                    positive: true
                })
        },
        {
            field: `direction`,
            headerName: 'Direccion Del Negocio',
            valueFormatter: business => {
                const dir = _.get(business, 'row.bussinesAdress.direction', 'Direccion No Encontrada')
                return dir
            },
            width: 250
        },
        {
            field: '',
            headerName: 'Acciones',
            sortable: false,
            width: 300,
            renderCell: function render(params) {
                return showActive ? (
                    <>
                        <Tooltip title='Historial de compras del Negocio' onClick={() => onEvent('history')}>
                            <Fab color='secondary'>
                                <HistoryOutlined></HistoryOutlined>
                            </Fab>
                        </Tooltip>
                        <Tooltip
                            title='Eliminar Negocio'
                            style={{ marginLeft: '10px' }}
                            onClick={() => onEvent('delete')}
                        >
                            <Fab color='secondary' className={style.deleteBtn}>
                                <DeleteOutlineSharp></DeleteOutlineSharp>
                            </Fab>
                        </Tooltip>
                        <Tooltip
                            title='Ubicacion Del Negocio'
                            style={{ marginLeft: '10px' }}
                            onClick={() => onEvent('location')}
                        >
                            <Fab color='primary' className={style.addCreditBtn}>
                                <Room></Room>
                            </Fab>
                        </Tooltip>
                        <Tooltip
                            title='Registrar Pago'
                            style={{ marginLeft: '10px' }}
                            onClick={() => onEvent('payment')}
                        >
                            <Fab color='primary'>
                                <MonetizationOn></MonetizationOn>
                            </Fab>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <Button variant='outlined' color='secondary' onClick={() => onEvent('activate')}>
                            Habilitar Negocio
                        </Button>
                    </>
                )
            }
        }
    ]

    const filteredBusiness = businessList.filter(value => {
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
        if (col.field === 'estatus') {
            setShowActive(a => !a)
        }
    }

    const noRowComponent = <Alert severity='info'>¡Ups! Parece que no existen resultados</Alert>

    return (
        <>
            <div style={{ height: '100%', width: '100%' }} className={style.root}>
                <RowProvider component={noRowComponent}>
                    <DataGrid
                        localeText={GRID_DEFAULT_LOCALE_TEXT}
                        rows={filteredBusiness}
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

export default BusinessTable
