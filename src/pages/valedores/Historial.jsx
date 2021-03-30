import React, { useEffect, useState } from 'react'
import { Paper } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import { valesHistory } from 'requests/allValedores'
import { useLocation } from 'react-router-dom'
import numeral from 'numeral'
import { GRID_DEFAULT_LOCALE_TEXT } from '../../themes/gridText'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const Historial = () => {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const email = location.state.valedor.email
  const [history, setHistory] = useState([])

  const useStyles = makeStyles({
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
      const { success, response, error } = await valesHistory(email)
      if (success && response) {
        setHistory(response.data)
        setIsLoading(false)
      } else {
        //console.log(error)
      }
    }
    getAllVales()
  }, [])

  const columns = [
    { field: 'id', headerName: 'Folio', width: 150, flex: 0.1 },
    { field: 'createdAt', headerName: 'Fecha', width: 250 },
    {
      field: 'credits',
      headerName: 'Crédito',
      valueFormatter: (estatus) => numeral(estatus.row.credits).format('$0,0'),
      width: 150
    },
    {
      field: `estatus`,
      headerName: 'Usado',
      valueFormatter: (estatus) => (estatus.row.estatus === 0 ? 'No' : 'Si'),
      cellClassName: (estatus) =>
        clsx('super-app', {
          negative: estatus.row.estatus === 0,
          positive: estatus.row.estatus === 1
        }),
      width: 150
    },
    {
      field: 'placeSpent',
      headerName: 'Negocio',
      valueFormatter: (estatus) =>
        estatus.row.placeSpent ? estatus.row.placeSpent : 'Vale sin utilizar',
      width: 150
    }
  ]

  const classes = useStyles()

  return (
    <div style={{ textAlign: 'center' }}>
      {isLoading ? (
        <CircularProgress></CircularProgress>
      ) : (
        <Paper style={{ height: 540, width: '100%' }} className={classes.root}>
          <DataGrid
            pageSize={9}
            components={{
              Toolbar: GridToolbar
            }}
            localeText={GRID_DEFAULT_LOCALE_TEXT}
            checkboxSelection
            getRowId={(row) => row._id}
            rows={history}
            icons
            columns={columns}
          />
        </Paper>
      )}
    </div>
  )
}

export default Historial
