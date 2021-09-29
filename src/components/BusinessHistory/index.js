import React, { useContext, useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core/styles'
import { GRID_DEFAULT_LOCALE_TEXT } from '../../themes/gridText'
import numeral from 'numeral'
import moment from 'moment'
import 'moment/min/locales'
import { NoRow } from '../../assets/Helpers/NoRow'
import { getBusinessHistory } from 'requests/allVales'
import useUser from 'hooks/useUser'
import { Alert } from '@material-ui/lab'
import { RowProvider } from 'assets/Helpers/RowContext'
import _ from 'lodash'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

moment.locale('es')

const columns = [
    {
        field: 'idVale',
        headerName: 'ID del vale',
        width: 250
    },
    {
        field: 'concept',
        headerName: 'Concepto de compra',
        width: 250
    },
    {
        field: 'credits',
        headerName: 'Credito de compra',
        valueFormatter: valedor => numeral(valedor.row.credits).format('$0,0'),
        width: 180
    },
    {
        field: 'datePurchase',
        headerName: 'Fecha de compra',

        valueFormatter: purchase => moment(purchase.row.datePurchase).format('MM/DD/YYYY  hh:mm A'),
        width: 250
    }
]

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1)
    }
}))

export const BusinessHistory = React.forwardRef((props, ref) => {
    const classes = useStyles()
    const user = useUser()
    const [currentDate, setCurrentDate] = React.useState(new Date().toISOString().slice(0, 10))

    const [history, setHistory] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(1)

    const useStyle = makeStyles({
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
        }
    })

    const getHistory = async () => {
        setLoading(true)
        const formatNumbers =
            props.date === ''
                ? ''
                : currentDate
                      .split('-')
                      .map(num => parseInt(num))
                      .reverse()
                      .join('-')
        const { success, response, error } = await getBusinessHistory(formatNumbers, user._id, page)
        if (success && response) {
            if (response.data) {
                setHistory(_.get(response, 'data.docs', []))
                console.log(_.get(response, 'data.docs', []))
                setLoading(false)
                setTotalPages(response.data.totalDocs)
            }
        }
    }

    useEffect(() => {
        getHistory()
    }, [page, currentDate, props.date])

    React.useImperativeHandle(ref, () => {
        return {
            reload: () => getHistory(),
            setDate: date => {
                const datef = date
                console.log(datef)
                setCurrentDate(datef)
            }
        }
    })

    const noRowsComponent = (
        <Alert severity='info'>
            ¡Ups! Parece que no existen registros del
            {` ${props.date || 'negocio'}`}
        </Alert>
    )

    const style = useStyle()
    return (
        <>
            <div style={{ height: '100%', width: '100%' }}>
                <RowProvider component={noRowsComponent}>
                    <DataGrid
                        localeText={GRID_DEFAULT_LOCALE_TEXT}
                        rows={history}
                        getRowId={row => row._id}
                        components={{
                            NoRowsOverlay: NoRow
                        }}
                        columns={columns}
                        pageSize={5}
                        pagination
                        rowsPerPageOptions={[5]}
                        rowCount={totalPages}
                        paginationMode='server'
                        onPageChange={newPage => {
                            console.log(newPage.page)
                            setPage(newPage.page + 1)
                        }}
                        loading={loading}
                    />
                </RowProvider>
            </div>
        </>
    )
})
