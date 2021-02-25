import React, { useState, useEffect } from 'react'
import { Grid, Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PopUp from 'components/Dialog/PopUp'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { getValedores } from 'requests/allValedores'
import RegisterValedor from 'components/valedor/register'

const columns = [
  { id: 'name', label: 'Nombre' },
  { id: 'code', label: 'Correo' },
  { id: 'code', label: 'Acciones' }
]

function createData(name, code, population, size) {
  const density = population / size
  return { name, code, population, size, density }
}

const rows = [
  createData('India', 'IN', 1324171354),
  createData('China', 'CN', 1403500365),
  createData('Italy', 'IT', 60483973),
  createData('United States', 'US', 327167434),
  createData('Canada', 'CA', 37602103),
  createData('Australia', 'AU', 25475400),
  createData('Germany', 'DE', 83019200),
  createData('Ireland', 'IE', 4857000),
  createData('Mexico', 'MX', 126577691),
  createData('Japan', 'JP', 126317000),
  createData('France', 'FR', 67022000),
  createData('United Kingdom', 'GB', 67545757),
  createData('Russia', 'RU', 146793744),
  createData('Nigeria', 'NG', 200962417),
  createData('Brazil', 'BR', 210147125)
]

const useStyles2 = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  }
})

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  buttonPaper: {
    padding: theme.spacing(2),
    textAlign: 'right',
    color: theme.palette.text.secondary
  }
}))

const Valedores = () => {
  const classes = useStyles()
  const classes2 = useStyles2()

  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    function getAllValedores() {
      const valedores = getValedores()
      console.log(valedores)
    }
    getAllValedores()
  }, [])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.buttonPaper}>
          <Button
            onClick={() => setOpenDialog(true)}
            color="primary"
            variant="contained"
          >
            Agregar Valedor
          </Button>
        </Paper>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id]
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      <PopUp openDialog={openDialog} setOpenDialog={setOpenDialog}>
        <RegisterValedor></RegisterValedor>
      </PopUp>
    </Grid>
  )
}

export default Valedores
