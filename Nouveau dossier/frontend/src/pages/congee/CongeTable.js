import React, { useState, useEffect } from 'react';
import {Alert,Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip, Grid, TablePagination, Container } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import styled from '@emotion/styled';

const CongeTable = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);
  const [snackmsg,setsnackmsg]=useState("")
  const [snackv , setsnackv] =useState("")
 
  const handleClose = () => {
    setOpen(false)
}

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US'); 
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/demandeconge'); 
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userData"))
    if(userdata.type_user.label === 'Colaborateur'){
      navigate("/404")
    }
    fetchData();
  }, []);

  const handleValidate = (id) => {
    const data = {
        id_demande : id,
        validation : true
    }
    axios.put("http://localhost:8000/api/demandeconge/validation",data)
    .then((res)=>{
      setOpen(true)
      setsnackmsg("congé validé")
      setsnackv("success")
        console.log(res.data)
        fetchData();
    })
  };

  const handlerefuser = (id) => {
    const data = {
        id_demande : id,
        refuser : true
    }
    axios.put("http://localhost:8000/api/demandeconge/refuser",data)
    .then((res)=>{
      setOpen(true)
      setsnackmsg("congé refuse")
      setsnackv("error")
        console.log(res.data)
        fetchData();
    })
  };
  const BoldTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    color:'white'
  }));
  const CustomTableHead = styled(TableHead)({
    backgroundColor: '#444468', 
  });
  return (
    <Grid container justifyContent="center">
    <Grid item xs={12} md={10}>
    <h1>List Conges</h1>
    <TableContainer component={Paper}>
      <Table>
        <CustomTableHead>
          <TableRow>
            <BoldTableCell>Person</BoldTableCell>
            <BoldTableCell>De</BoldTableCell>
            <BoldTableCell>A</BoldTableCell>
            <BoldTableCell>status</BoldTableCell>
            <BoldTableCell>Action</BoldTableCell>
          </TableRow>
        </CustomTableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row) => (
            <TableRow key={row.id_demande}>
            <TableCell>{row.user.name+" "+row.user.prenom}</TableCell>
            <TableCell>{formatDate(row.date_debut)}</TableCell>
            <TableCell>{formatDate(row.date_fin)}</TableCell>
            <TableCell>{<Chip label={!row.validation && !row.refuser && !row.annulation ? "en cours" : row.validation ? "valider" :  row.refuser ? "refuser" : row.annulation ? "annuler":null  } color={!row.validation && !row.refuser&& !row.annulation ? "info" : row.validation ? "success" : row.refuser  ? "error": row.annulation ? "error":null} />}</TableCell>
            <TableCell sx={{p:0, textAlign:"center"}}>
                {!row.validation && !row.refuser && !row.annulation? 
                        
                        <Container sx={{display:"flex",columnGap:1 , justifyContent:"center"}}>
                        <Button variant="outlined" color="success" onClick={() => handleValidate(row.id_demande)}>
                        Valider
                        </Button>
                        <Button variant="outlined" color="error" onClick={() => handlerefuser(row.id_demande)}>
                        Refuser
                        </Button>
                        </Container>
                        
                :<h3>pas d'action</h3>
                }
                </TableCell>

              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert variant="standard" onClose={handleClose} severity={snackv} sx={{ width: '100%' }}>
            {snackmsg}
          </Alert>
        </Snackbar>
    </Grid>
    </Grid>
  );
};

export default CongeTable;
