import React, { useContext, useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core/styles'
import { GRID_DEFAULT_LOCALE_TEXT } from '../../themes/gridText'
import numeral from 'numeral'
import moment from 'moment'
import 'moment/min/locales'
import { NoRow } from 'assets/Helpers/NoRow'
import _ from 'lodash'

moment.locale('es')

const columns = [
    {
        field: 'id',
        headerName: 'ID de pago',
        width: 250
    },
    {
        field: 'credits',
        headerName: 'Credito de pago',
        valueFormatter: valedor => numeral(valedor.row.credits).format('$0,0'),
        width: 250
    },
    {
        field: 'datePurchase',
        headerName: 'Fecha de pago',

        valueFormatter: purchase => moment(purchase.row.datePurchase).format('MM/DD/YYYY  hh:mm A'),
        width: 250
    }
]

export const ValedorPaymentTable = () => {
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

    React.useEffect(() => {
        async function getPurchaseHistory() {
            /*console.log('buss')
            console.log(business)
            const { success, response, error } = await getSingleBusinessHistory(business._id)
            if (success && response) {
                console.log(response)
                if (!response.error && !response.data.error) {
                    const x = response.data.map(p => ({ ...p.purchase, id: p.purchase._id }))
                    setPurchase(x)
                }
            }*/
        }

        getPurchaseHistory()
    }, [])

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
                    pageSize={6}
                    NoRow={<h1>Ho</h1>}
                />
            </div>
        </>
    )
}

export default ValedorPaymentTable
