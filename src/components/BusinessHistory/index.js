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

moment.locale('es')

const columns = [
    {
        field: 'firstName',
        headerName: 'Nombre',
        width: 250
    },
    {
        field: 'lastName',
        headerName: 'Apellido',
        width: 250
    },
    {
        field: 'credits',
        headerName: 'Crédito',
        valueFormatter: valedor => numeral(valedor.row.credits).format('$0,0'),
        width: 180
    },
    {
        field: 'updatedAt',
        headerName: 'Fecha de compra',

        valueFormatter: valedor => moment(valedor.row.updatedAt).format('MM/DD/YYYY  hh:mm A'),
        width: 250
    },
    {
        field: 'concept',
        headerName: 'Concepto de compra',
        width: 350
    }
]

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1)
    }
}))

export const BusinessHistory = ({ showDialog = false }) => {
    const classes = useStyles()
    const { user } = useContext(UserContext)

    const [vales, setVales] = useState([])
    const history = useHistory()

    const sortedVales = vales.sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
    })

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

    useEffect(() => {
        async function getAllVales() {
            const { success, response, error } = await valesHistory(user.email)
            if (success && response) {
                if (response.error) {
                    console.error(response.error)
                } else {
                    setVales(response.data.map(vale => ({ ...vale, concept: 'Unos Tennis XD' })))
                }
                //setIsLoading(false)
            } else {
                //console.log(error)
            }
        }

        !showDialog && getAllVales()
    }, [showDialog])

    const style = useStyle()
    return (
        <>
            <div style={{ height: '100%', width: '100%' }}>
                <DataGrid
                    localeText={GRID_DEFAULT_LOCALE_TEXT}
                    rows={sortedVales}
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
}
