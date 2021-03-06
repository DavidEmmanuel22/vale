import React, { useContext, useEffect, useState } from 'react'
import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core/styles'
import { GRID_DEFAULT_LOCALE_TEXT } from '../../themes/gridText'
import numeral from 'numeral'
import moment from 'moment'
import 'moment/min/locales'
import { NoRow } from '../../assets/Helpers/NoRow'
import { getBusinessHistory } from 'requests/allVales'
import useUser from 'hooks/useUser'
import { Alert, Pagination } from '@material-ui/lab'
import { RowProvider } from 'assets/Helpers/RowContext'
import _ from 'lodash'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { getSingleBusinessHistory } from 'requests/allNegocios'

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
    },
    pagination: {
        display: 'flex'
    }
}))

const PaginationHandler = React.createContext(null)

function CustomPagination() {
    const { state, apiRef } = useGridSlotComponentProps()
    const { paginationRef } = React.useContext(PaginationHandler)
    const classes = useStyles()

    React.useImperativeHandle(paginationRef, () => ({
        resetPage: () => {
            apiRef.current.setPage(0)
        }
    }))

    return (
        <Pagination
            className={classes.pagination}
            color='primary'
            count={state.pagination.pageCount}
            page={state.pagination.page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    )
}

export const BusinessHistory = React.forwardRef(({ dateRange }, ref) => {
    const classes = useStyles()
    const user = useUser()

    const [history, setHistory] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(1)

    const paginationRef = React.useRef(null)

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
        const { success, response, error } = await getSingleBusinessHistory(
            user._id,
            page,
            formatDate(dateRange[0].startDate),
            formatDate(dateRange[0].endDate)
        ) //getBusinessHistory(formatNumbers, user._id, page)
        if (success && response) {
            if (response.data) {
                setHistory(_.get(response, 'data.docs', []))
                setLoading(false)
                setTotalPages(response.data.totalDocs)
            }
        }
    }

    useEffect(() => {
        getHistory()
    }, [page, dateRange])

    useEffect(() => {
        paginationRef.current && paginationRef.current.resetPage()
    }, [dateRange])

    function formatDate(date) {
        if (!(date instanceof Date)) {
            return false
        }
        const month = date.getUTCMonth() + 1
        const day = date.getUTCDate()
        const year = date.getUTCFullYear()

        return day + '-' + month + '-' + year
    }

    React.useImperativeHandle(ref, () => {
        return {
            reload: () => getHistory(),
            setDate: date => {}
        }
    })

    const noRowsComponent = <Alert severity='info'>??Ups! Parece que no existen registros del negocio</Alert>

    const style = useStyle()
    return (
        <>
            <div style={{ height: '100%', width: '100%' }}>
                <RowProvider component={noRowsComponent}>
                    <PaginationHandler.Provider value={{ paginationRef }}>
                        <DataGrid
                            localeText={GRID_DEFAULT_LOCALE_TEXT}
                            rows={history}
                            rowHeight={80}
                            getRowId={row => row._id}
                            components={{
                                NoRowsOverlay: NoRow,
                                Pagination: CustomPagination
                            }}
                            columns={columns}
                            pageSize={5}
                            pagination
                            rowsPerPageOptions={[5]}
                            rowCount={totalPages}
                            paginationMode='server'
                            onPageChange={newPage => {
                                setPage(newPage.page + 1)
                            }}
                            loading={loading}
                        />
                    </PaginationHandler.Provider>
                </RowProvider>
            </div>
        </>
    )
})
