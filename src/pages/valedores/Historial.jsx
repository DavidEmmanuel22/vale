import React,{useEffect, useState} from 'react';
import { Grid, Paper, Button, Hidden } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { DataGrid } from "@material-ui/data-grid";
import { getValedores } from 'requests/allValedores'
const Historial = () => {
    const[valedores, setValedores] = useState([])
    useEffect(() => {
        async function getAllValedores() {
          const { success, response, error } = await getValedores()
          if (success && response) {
            setValedores(response.data)
          } else {
            //console.log(error)
          }
        }
        getAllValedores()
      }, [])
//     const valedores = [{
//         id: 1,
//         estatus: 0,
//         firstName: 'Nombre De Alguien',
//         lastName: "Apellido de Alguien",
//         email: "hola@test.com",
//         credits: 300,
//         folio: '1233131231'

//     },
//     {
//         id: 2,
//         estatus: 1,
//         firstName: 'Nombre De Alguien',
//         lastName: "Apellido de Alguien",
//         email: "hola@test.com",
//         credits: 300,
//         folio: '1233131231'

//     },
//     {
//         id: 3,
//         estatus: 0,
//         firstName: 'Nombre De Alguien',
//         lastName: "Apellido de Alguien",
//         email: "hola@test.com",
//         credits: 300,
//         folio: '1233131231'

//     },
//     {
//         id: 4,
//         estatus: 0,
//         firstName: 'Nombre De Alguien',
//         lastName: "Apellido de Alguien",
//         email: "hola@test.com",
//         credits: 300,
//         folio: '1233131231'

//     },
//     {
//         id: 5,
//         estatus: 0,
//         firstName: 'Nombre De Alguien',
//         lastName: "Apellido de Alguien",
//         email: "hola@test.com",
//         credits: 300,
//         folio: '1233131231'

//     },
//     {
//         id: 6,
//         estatus: 0,
//         firstName: 'Nombre De Alguien',
//         lastName: "Apellido de Alguien",
//         email: "hola@test.com",
//         credits: 300,
//         folio: '1233131231'

//     },
//     {
//         id: 7,
//         estatus: 1,
//         firstName: 'Nombre De Alguien',
//         lastName: "Apellido de Alguien",
//         email: "hola@test.com",
//         credits: 300,
//         folio: '1233131231'

//     },{
//         id: 8,
//         estatus: 1,
//         firstName: 'Nombre De Alguien',
//         lastName: "Apellido de Alguien",
//         email: "hola@test.com",
//         credits: 300,
//         folio: '1233131231'

//     },
//     {
//         id: 9,
//         estatus: 1,
//         firstName: 'Nombre De Alguien',
//         lastName: "Apellido de Alguien",
//         email: "hola@test.com",
//         credits: 300,
//         folio: '1233131231'

//     },
//     {
//         id: 17,
//         estatus: 1,
//         firstName: 'Nombre De Alguien',
//         lastName: "Apellido de Alguien",
//         email: "hola@test.com",
//         credits: 300,
//         folio: '1233131231'

//     },
//     {
//         id: 33,
//         estatus: 1,
//         firstName: 'Nombre De Alguien',
//         lastName: "Apellido de Alguien",
//         email: "hola@test.com",
//         credits: 300,
//         folio: '1233131231'

//     },
//     {
//         id: 55,
//         estatus: 1,
//         firstName: 'Nombre De Alguien',
//         lastName: "Apellido de Alguien",
//         email: "hola@test.com",
//         credits: 300,
//         folio: '1233131231'

//     }
// ]
//     return (
//         <Grid container>
//       <Grid item xs={12}>
//         <Paper>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell align="center">
//                     Folio
//                   </TableCell>
//                   <TableCell align="center">Nombre</TableCell>
//                   <Hidden smDown>
//                     <TableCell align="center">A</TableCell>
//                   </Hidden>
//                   <TableCell align="center">B</TableCell>
//                   <TableCell align="center">C</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {valedores.map((valedor, index) => (
//                   <TableRow key={index} role="checkbox" tabIndex={-1}>
//                         <>
//                           <TableCell align="center">
//                             {valedor.folio}
//                           </TableCell>
//                           <TableCell align="center">
//                             {valedor.firstName} {valedor.lastName}
//                           </TableCell>
//                           <Hidden smDown>
//                             <TableCell align="center">
//                               {valedor.email}
//                             </TableCell>
//                           </Hidden>
//                           <TableCell align="center">
//                             {valedor.credits}
//                           </TableCell>
//                           <TableCell style={{display: 'flex'}} align="center">
//                           <Button
//                               color="primary"
//                               style={{ marginRight: '10px' }}
//                             >
//                               Accion 1
//                             </Button>
//                             <Button
//                               color="primary"
//                               style={{ marginRight: '10px' }}
//                             >
//                               Accion 2
//                             </Button>
//                           </TableCell>
//                         </>
//                   </TableRow>
//                   )
//                   )
//                 }
//                 </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       </Grid>
//       </Grid>
//     );

const btn =  <Button
color="primary"
style={{ marginRight: '10px' }}
>
Accion 2
</Button>

  
  const columns = [
    { field: "id", hide: true },
    { field: "id", headerName: "Folio", width: 150 },
    { field: "createdAt", headerName: "Fecha", width: 250 },
    { field: "credits", headerName: "Credito", width: 150 },
    { field: "estatus", headerName: "Usado / No usado", width: 150 },
    { field: "email", headerName: "Negocio", width: 150 },

  ];

  const valedoresFiltered = valedores.filter(valedor => {
      if(valedor.estatus === 0) return valedor
      return null
  })

return (
   
   
         <Paper style={{ height: 520, width: "100%" }}>
    {valedores.length > 1 ? <DataGrid 
    onRowClick={(valedor)=> console.log(valedor.row)}
    getRowId={(row) => row._id} 
    rows={valedoresFiltered} 
    columns={columns} /> : null}
  </Paper>
    
   
  
  
  
)
};

export default Historial;