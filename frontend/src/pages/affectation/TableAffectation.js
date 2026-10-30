import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material';
import {
  Alert,
  Snackbar,
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
import { Link, useNavigate } from 'react-router-dom';

export const TableAffectation = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [snackmsg, setsnackmsg] = useState("");
  const [snackv, setsnackv] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-fr');
  };

  const getRows = () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user.type_user.label !== 'Colaborateur') {
      axios.get('http://localhost:8000/api/affectations')
        .then((res) => {
          setLoading(false);
          setRows(res.data.data );
        })
        .catch(error => {
          console.error('Error fetching rows:', error);
          setLoading(false);
          setRows([]);
        });
    } else {
      axios.get(`http://localhost:8000/api/affectations/user/${user.id_user}`)
        .then((res) => {
          setLoading(false);
          setRows( res.data.data);
        })
        .catch(error => {
          console.error('Error fetching rows:', error);
          setLoading(false);
          setRows([]);
        });
    }
  };

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userData"));
    if (userdata.type_user.label === 'Colaborateur') {
      navigate("/404");
    }
    getRows();
  }, [navigate]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/affectations/${id}`)
      .then(() => {
        setOpen(true);
        setsnackmsg("Personne bien supprimée");
        setsnackv("error");
        getRows();
      })
      .catch(error => {
        console.error('Error deleting row:', error);
      });
  };

  const BoldTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    color: 'white'
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
            <h1>Gestion Affectation</h1>
            <Link to="/Ajouteraffectation">
              <Button variant="outlined" color="primary" style={{ marginBottom: '15px' }}>
                Ajouté une affectation<AddIcon />
              </Button>
            </Link>
            <TableContainer component={Paper}>
              <Table aria-label="record table">
                <CustomTableHead>
                  <TableRow>
                    <BoldTableCell>De</BoldTableCell>
                    <BoldTableCell>A</BoldTableCell>
                    <BoldTableCell>Chantier</BoldTableCell>
                    <BoldTableCell>Personnel</BoldTableCell>
                    <BoldTableCell>Action</BoldTableCell>
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
                      <TableCell>{row.chantier.nom_chantier}</TableCell>
                      <TableCell>{`${row.user.name} ${row.user.prenom}`}</TableCell>
                      <TableCell sx={{ display: "flex", columnGap: 1 }}>
                        <Link to={`/updateaffectation/${row.id_affectation}`} style={{ textDecoration: 'none' }}>
                          <Button variant="outlined" color="warning">
                            <EditIcon />
                          </Button>
                        </Link>
                        <Button variant="outlined" color="error" onClick={() => handleDelete(row.id_affectation)}>
                          <DeleteIcon />
                        </Button>
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
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="standard" onClose={handleClose} severity={snackv} sx={{ width: '100%' }}>
          {snackmsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TableAffectation;
