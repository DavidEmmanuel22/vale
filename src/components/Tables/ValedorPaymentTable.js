/* eslint-disable no-unneeded-ternary */
import React, { useContext, useEffect, useState } from 'react'
import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core/styles'
import { GRID_DEFAULT_LOCALE_TEXT } from '../../themes/gridText'
import numeral from 'numeral'
import moment from 'moment'
import 'moment/min/locales'
import { NoRow } from 'assets/Helpers/NoRow'
import _ from 'lodash'
import { Pagination } from '@material-ui/lab'
import { getValedorPaymentHistory } from 'requests/allValedores'

moment.locale('es')
/*
"_id": "6144a82b4663750799282b1b",
                "idTransaction": "",
                "credits": 1000,
                "idUser": "61436358a554400014d7231b",
                "datePay": "2021-09-17T14:37:30.954Z",
                "datePayString": "17-9-2021",
                "createdAt": "2021-09-17T14:37:31.180Z",
                "updatedAt": "2021-09-17T14:37:31.180Z",
                "__v": 0
*/
const columns = [
    {
        field: 'idTransaction',
        headerName: 'ID de transaccion',
        width: 300,
        sortable: false,
        valueFormatter: valedor => (valedor.row.idTransaction ? valedor.row.idTransaction : 'No se registro ID')
    },
    {
        field: 'credits',
        headerName: 'Monto de pago',
        sortable: false,
        valueFormatter: valedor => numeral(valedor.row.credits).format('$0,0'),
        width: 300
    },
    {
        field: 'datePay',
        headerName: 'Fecha de pago',
        sortable: false,
        valueFormatter: purchase => moment(purchase.row.datePurchase).format('MM/DD/YYYY  hh:mm A'),
        width: 300
    }
]

const useStyle = makeStyles({
    root: {},
    pagination: {
        display: 'flex'
    }
})

const PaginationHandler = React.createContext(null)

function CustomPagination() {
    const { state, apiRef } = useGridSlotComponentProps()
    const { paginationRef } = React.useContext(PaginationHandler)
    const classes = useStyle()

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

export const ValedorPaymentTable = ({ dateRange, valedor }) => {
    if (!Array.isArray(dateRange) || !dateRange.length) {
        throw new Error('This component need a range dates object with this properties')
    }

    const paginationRef = React.useRef(null)

    const [purchase, setPurchase] = React.useState([])

    const style = useStyle()

    const [page, setPage] = React.useState(1)
    const [totalDocs, setTotalDocs] = React.useState(1)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        async function getPurchaseHistory() {
            setLoading(true)
            const { success, response, error } = await getValedorPaymentHistory(valedor._id)
            if (!mounted) {
                return
            }
            if (success && response) {
                if (!response.error && !response.data.error) {
                    setTotalDocs(response.data.length)
                    setPurchase(response.data.map(doc => ({ ...doc.pay, id: doc.pay._id })))
                }
                setLoading(false)
            }
        }
        let mounted = true
        getPurchaseHistory()

        return () => {
            mounted = false
        }
    }, [page, dateRange])

    React.useEffect(() => {
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

    return (
        <>
            <div style={{ height: '100%', width: '100%' }} className={style.root}>
                <PaginationHandler.Provider value={{ paginationRef }}>
                    <DataGrid
                        disableColumnFilter
                        localeText={GRID_DEFAULT_LOCALE_TEXT}
                        rows={purchase}
                        rowHeight={80}
                        components={{
                            NoRowsOverlay: NoRow,
                            Pagination: CustomPagination
                        }}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        loading={loading}
                    />
                </PaginationHandler.Provider>
            </div>
        </>
    )
}

export default ValedorPaymentTable
