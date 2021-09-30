import React, { useContext, useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core/styles'
import { GRID_DEFAULT_LOCALE_TEXT } from '../../themes/gridText'
import numeral from 'numeral'
import moment from 'moment'
import 'moment/min/locales'
import { NoRow } from 'assets/Helpers/NoRow'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import _ from 'lodash'
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

export const SingleBusinessTable = ({ business }) => {
    const [purchase, setPurchase] = React.useState([])

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

    const style = useStyle()

    const [page, setPage] = React.useState(1)
    const [totalDocs, setTotalDocs] = React.useState(1)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        async function getPurchaseHistory() {
            setLoading(true)
            const { success, response, error } = await getSingleBusinessHistory(business._id, page)
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
    }, [page])

    return (
        <>
            <div style={{ height: '100%', width: '100%' }} className={style.root}>
                <DataGrid
                    localeText={GRID_DEFAULT_LOCALE_TEXT}
                    rows={purchase}
                    rowHeight={80}
                    components={{
                        NoRowsOverlay: NoRow
                    }}
                    columns={columns}
                    pageSize={5}
                    pagination
                    rowsPerPageOptions={[5]}
                    rowCount={totalDocs}
                    paginationMode='server'
                    onPageChange={newPage => {
                        console.log(newPage.page)
                        setPage(newPage.page + 1)
                    }}
                    loading={loading}
                />
            </div>
        </>
    )
}

export default SingleBusinessTable
