import React, { useContext, useEffect, useState } from 'react'
import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core/styles'
import { GRID_DEFAULT_LOCALE_TEXT } from '../../themes/gridText'
import numeral from 'numeral'
import moment from 'moment'
import 'moment/min/locales'
import { NoRow } from 'assets/Helpers/NoRow'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import _ from 'lodash'
import { getSingleBusinessHistory } from 'requests/allNegocios'
import { Alert, Pagination } from '@material-ui/lab'

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
        width: 250,
        sortable: false
    },
    {
        field: 'credits',
        headerName: 'Credito de compra',
        valueFormatter: valedor => numeral(valedor.row.credits).format('$0,0'),
        width: 180,
        sortable: false
    },
    {
        field: 'datePurchase',
        headerName: 'Fecha de compra',
        sortable: false,
        valueFormatter: purchase => moment(purchase.row.datePurchase).format('MM/DD/YYYY  hh:mm A'),
        width: 250
    }
]

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

export const SingleBusinessTable = ({ business, dateRange }) => {
    const paginationRef = React.useRef(null)

    const [purchase, setPurchase] = React.useState([])

    const style = useStyle()

    const [page, setPage] = React.useState(1)
    const [totalDocs, setTotalDocs] = React.useState(1)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        async function getPurchaseHistory() {
            setLoading(true)
            const { success, response, error } = await getSingleBusinessHistory(
                business._id,
                page,
                formatDate(dateRange[0].startDate),
                formatDate(dateRange[0].endDate)
            )
            if (success && response) {
                if (!response.error && !response.data.error) {
                    console.log(response)
                    setTotalDocs(_.get(response, 'data.totalDocs', 5))
                    setPurchase(_.get(response, 'data.docs', []).map(p => ({ ...p, id: p._id })))
                }
                setLoading(false)
            }
        }

        getPurchaseHistory()
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

    return (
        <>
            <div style={{ height: '100%', width: '100%' }} className={style.root}>
                <PaginationHandler.Provider value={{ paginationRef }}>
                    <DataGrid
                        localeText={GRID_DEFAULT_LOCALE_TEXT}
                        rows={purchase}
                        rowHeight={80}
                        components={{
                            NoRowsOverlay: NoRow,
                            Pagination: CustomPagination
                        }}
                        columns={columns}
                        pageSize={5}
                        pagination
                        rowsPerPageOptions={[5]}
                        rowCount={totalDocs}
                        paginationMode='server'
                        onPageChange={newPage => {
                            setPage(newPage.page + 1)
                        }}
                        loading={loading}
                    />
                </PaginationHandler.Provider>
            </div>
        </>
    )
}

export default SingleBusinessTable
