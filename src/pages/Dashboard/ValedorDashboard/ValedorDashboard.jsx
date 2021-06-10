import React, { useContext, useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { GRID_DEFAULT_LOCALE_TEXT } from '../../../themes/gridText'
import { UserContext } from 'context/userContext'
import { valesHistory } from 'requests/allValedores'
import numeral from 'numeral'
import clsx from 'clsx'
import { useHistory } from 'react-router'
import moment from 'moment'
import 'moment/min/locales'
import { NoRow } from 'assets/Helpers/NoRow'

moment.locale('es')

const columns = [
  { field: '_id', headerName: 'Folio', width: 250 },
  { field: 'firstName', headerName: 'Nombre', width: 250 },
  {
    field: 'lastName',
    headerName: 'Apellido',
    width: 150
  },
  {
    field: 'credits',
    headerName: 'Crédito',
    valueFormatter: (valedor) => numeral(valedor.row.credits).format('$0,0'),
    width: 150
  },
  {
    field: `estatus`,
    headerName: 'Usado',
    valueFormatter: (valedor) => (valedor.row.estatus === 0 ? 'No' : 'Si'),
    cellClassName: (valedor) =>
      clsx('super-app', {
        negative: valedor.row.estatus === 0,
        positive: valedor.row.estatus >= 1
      }),
    width: 150
  },
  {
    field: 'updatedAt',
    headerName: 'Fecha',

    valueFormatter: (valedor) =>
      moment(valedor.row.updatedAt).format('MM/DD/YYYY  hh:mm A'),
    width: 200
  }
]

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  }
}))

export const ValedorDashboard = () => {
  //const classes = useStyles()
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
        setVales(response.data)
        //setIsLoading(false)
      } else {
        //console.log(error)
      }
    }
    if (vales.length === 0) {
      getAllVales()
    }
  }, [])

  const style = useStyle()
  return (
    <>
      <Paper style={{ height: 470, width: '98%' }} className={style.root}>
        <div style={{ height: 470, width: '100%' }}>
          <DataGrid
            localeText={GRID_DEFAULT_LOCALE_TEXT}
            rows={sortedVales}
            getRowId={(row) => row._id}
            components={{
              NoRowsOverlay: NoRow
            }}
            columns={columns}
            pageSize={6}
            onRowClick={(id) => {
              const idFolio = id.id
              const credits = id.row.credits
              if (credits > 0) {
                history.push({
                  pathname: '/vale',
                  state: {
                    idFolio
                  }
                })
              }
            }}
          />
        </div>
      </Paper>
    </>
  )
}
