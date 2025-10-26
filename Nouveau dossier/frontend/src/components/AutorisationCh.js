import { Alert, Button, Container, Grid, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
export default function AutorisationCh(props){
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows,setrows]=useState([])
    const [open, setOpen] = useState(false);
    const [snackmsg,setsnackmsg]=useState("")
    const [snackv , setsnackv] =useState("")
    let habiliteNumber = 1 ;
    const user = JSON.parse(localStorage.getItem("userData"))
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    const handleClose = () => {
        setOpen(false)
    
}
    const gethabilite = ()=>{
        axios.get("http://localhost:8000/api/autorisation",{
            params:{
                chantier:props.idch,
            }}
            )
        .then((res)=>{
            console.log(res)
            setrows(res.data)
        })
    }
    useState(()=>{
        gethabilite()
    },[])
    

    return(
        <Container>
    <Grid container justifyContent="center">
        <Grid item xs={12} md={10}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Document</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row)=>(
                            <TableRow key={row.id_Plan}>
                                <TableCell>Document_{habiliteNumber++}</TableCell>
                                <TableCell sx={{display:"flex" , columnGap:1}}><Button variant="outlined" color="inherit" onClick={()=>window.location.href = 'https://serv.yuliagroup.com/autorisation/AutorisationUploads/'+row.label}><VisibilityIcon/></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
            </TableContainer>
            </Grid>
            </Grid>
            <Snackbar  open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="standard" onClose={handleClose} severity={snackv} sx={{ width: '100%' }}>
          {snackmsg}
        </Alert>
      </Snackbar>
        </Container>
    )
}