import React, { useContext, useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { GRID_DEFAULT_LOCALE_TEXT } from '../../themes/gridText'
import { UserContext } from '../../context/userContext'
import { valesHistory } from '../../requests/allValedores'
import numeral from 'numeral'
import clsx from 'clsx'
import { useHistory } from 'react-router'
import moment from 'moment'
import 'moment/min/locales'
import { NoRow } from '../../assets/Helpers/NoRow'
import { getBusinessHistory } from 'requests/allVales'
import useUser from 'hooks/useUser'

moment.locale('es')

/*
"_id": "6113e32e49877a0014c3313b",
                "idVale": "610433976e59e4001473a2a9",
                "credits": 2,
                "idBussines": "61018a784dfb2a00149099c3",
                "datePurchase": "2021-08-11T14:48:14.903Z",
                "concept": "hello world",
                "createdAt": "2021-08-11T14:48:14.904Z",
                "updatedAt": "2021-08-11T14:48:14.904Z",
                "__v": 0
*/

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

    const [history, setHistory] = useState([])

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
        console.log(user)
        const { success, response, error } = await getBusinessHistory(user._id)
        if (success && response) {
            if (response.data) {
                setHistory(response.data.map(purch => purch.purchase))
            }
        }
    }

    useEffect(() => {
        getHistory()
    }, [])

    React.useImperativeHandle(ref, () => {
        return {
            reload: () => getHistory()
        }
    })

    const style = useStyle()
    return (
        <>
            <div style={{ height: '100%', width: '100%' }}>
                <DataGrid
                    localeText={GRID_DEFAULT_LOCALE_TEXT}
                    rows={history}
                    getRowId={row => row._id}
                    components={{
                        NoRowsOverlay: NoRow
                    }}
                    columns={columns}
                    pageSize={6}
                    onRowClick={id => {
                        console.log(id)
                    }}
                />
            </div>
        </>
    )
})
