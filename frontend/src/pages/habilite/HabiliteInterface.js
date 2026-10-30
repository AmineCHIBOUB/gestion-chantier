import { Alert, Button, Container, Grid, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
export default function HabiliteInterface(){
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
        axios.get("http://localhost:8000/api/habilite/"+user.id_user)
        .then((res)=>{
            setrows(res.data)
        })
    }
    useState(()=>{
        gethabilite()
    },[])
    const handlpdf=(e)=>{
        const data = new FormData() 
        data.append('label', e.target.files[0])
        data.append('user',user.id_user)
        console.log(user)
    axios.post("http://localhost:8000/api/habilite/",data)
    .then((res)=>{
        setOpen(true)
        setsnackmsg("habilite bien ajouter")
        setsnackv("success")
        gethabilite()
    })}

    const handlpdfchange=(e,id)=>{
        const data = new FormData() 
        data.append('label', e.target.files[0])
    axios.put("http://localhost:8000/api/habilite/"+id,data)
    .then((res)=>{
        setOpen(true)
        setsnackmsg("habilite bien changer")
        setsnackv("info")
        gethabilite()
    })
    }

    const handlesupp=(id)=>{
    axios.delete("http://localhost:8000/api/habilite/"+id)
    .then((res)=>{
        setOpen(true)
        setsnackmsg("habilite bien supprimer")
        setsnackv("error")
        gethabilite()
    })
    }
    return(
        <Container>
    <Grid container justifyContent="center">
        <Grid item xs={12} md={10}>
        <h1>Mes habilitations</h1>
            <TableContainer>
            <Button variant="outlined" onChange={handlpdf} component="label" color="primary" >
            <input type="file" hidden />
            <AddIcon />
            </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Habilite</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row)=>(
                            <TableRow key={row.id_habilite}>
                                <TableCell>Habilite_{habiliteNumber++}</TableCell>
                                <TableCell sx={{display:"flex" , columnGap:1}}><Button variant="outlined" color="inherit" onClick={()=>window.location.href = 'http://localhost:9090/habilite/HabiliteUploads/'+row.label}><VisibilityIcon/></Button>
                                <Button  variant="outlined" component="label" color="warning" onChange={(e)=>handlpdfchange(e,row.id_habilite)}><input type="file" hidden /> <EditIcon/></Button>
                                <Button  variant="outlined" component="label" color="error" onClick={()=>handlesupp(row.id_habilite)}><DeleteIcon/></Button>
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
            {/* meesage */}
            <Snackbar  open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="standard" onClose={handleClose} severity={snackv} sx={{ width: '100%' }}>
          {snackmsg}
        </Alert>
      </Snackbar>
        </Container>
    )
}