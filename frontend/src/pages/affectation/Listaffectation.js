import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

export const Listaffectation = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-fr'); 
  };

  const getRows = () => {
    let user = JSON.parse(localStorage.getItem("userData"))
    if(user.type_user.label !== 'Colaborateur'){
      axios.get('http://localhost:8000/api/affectations') // Replace 'your-endpoint' with your specific endpoint
      .then((res) => {
        setLoading(false);
        setRows(res.data.data);
        console.log(res.data)
      })
      .catch(error => {
        console.error('Error fetching rows:', error);
      });
  }else{
    
    axios.get('http://localhost:8000/api/affectations/user/'+user.id_user) // Replace 'your-endpoint' with your specific endpoint
    .then((res) => {
      setLoading(false);
      setRows(res.data);
      console.log(res.data)
    })
    .catch(error => {
      console.error('Error fetching rows:', error);
    });
  }
    }


  useEffect(() => {
    getRows();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/affectations/${id}`) // Replace 'your-endpoint' with your specific endpoint
      .then(() => {
        getRows();
      })
      .catch(error => {
        console.error('Error deleting row:', error);
      });
  };
  const BoldTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    color:'white'
  }));
  const CustomTableHead = styled(TableHead)({
    backgroundColor: '#444468', 
  });
  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10}>
            <h1>Affectation</h1>
            <TableContainer component={Paper}>
              <Table aria-label="record table">
                <CustomTableHead>
                  <TableRow>
                    <BoldTableCell>De</BoldTableCell>
                    <BoldTableCell>A</BoldTableCell>
                    <BoldTableCell>Chantier</BoldTableCell>
                    <BoldTableCell>Personnel</BoldTableCell>
                  </TableRow>
                </CustomTableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : rows
                  ).map((row) => (
                    <TableRow key={row.id_affectation}>
                      <TableCell>{formatDate(row.date_debut)}</TableCell>
                      <TableCell>{formatDate(row.date_fin)}</TableCell>
                      <TableCell>{row.chantier ? row.chantier.nom_chantier : 'Chantier non spécifié'}</TableCell>
                      <TableCell>{row.user.name+" "+row.user.prenom}</TableCell>
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
      )}
    </>
  );
};

export default Listaffectation;
