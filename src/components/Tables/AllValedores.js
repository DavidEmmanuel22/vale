import React from 'react'
// import Axios from 'axios'
import {
  Table,
  CardHeader,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider
} from '@material-ui/core'
import Styles from './Styles'

const AllValedores = () => {
  const classes = Styles()
  // const [ data ] = useState([])

  /*  const AllValedores = () =>{
    Axios.get('https://devbackend.valevaledor.com/all-users')
    .then(res => {
      console.log(res.data)
    })
  }
 
  useEffect(async() =>{
    await AllValedores() 
  },[])  */

  return (
    <div>
      <CardHeader className={classes.CardHeader} title="Lista de Valedores" />
      <Divider />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Crédito</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="td"></TableCell>
              <TableCell component="td"></TableCell>
              <TableCell component="td"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default AllValedores
