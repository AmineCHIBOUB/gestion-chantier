import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';
import axios from 'axios';
import {Alert,Snackbar,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, TablePagination, Container } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import TabPanel from '@mui/lab/TabPanel';
import LabTabsConge from '../../components/TabsConge';
import styled from '@emotion/styled';
const DemandeConge = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const user = JSON.parse(localStorage.getItem("userData"));
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);
  const [snackmsg,setsnackmsg]=useState("")
  const [snackv , setsnackv] =useState("")

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
  const handleClose = () => {
    setOpen(false)
}
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/demandeconge/' + user.id_user);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
 }, []);


  const handleannuler = (id) => {
    const data = {
      id_demande: id,
      annulation: true
    }
    axios.put("http://localhost:8000/api/demandeconge/Annulation", data)
      .then((res) => {
        setOpen(true)
        setsnackmsg("Annulation de congé")
        setsnackv("error")
        console.log(res.data)
        fetchData();
      })
  };

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user.id_user)
    try {
      const response = await axios.post('http://localhost:8000/api/demandeconge/create', {
        "date_debut": fromDate,
        "date_fin": toDate,
        "userIdUser": user.id_user
      });
      console.log('Submitted:', response.data);
      setOpen(true)
      setsnackmsg("congé ajoute")
      setsnackv("success")
    } catch (error) {
      console.error('Error submitting data:', error);
    }
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
        <LabTabsConge>
          <TabPanel value="1">
            <form onSubmit={handleSubmit} style={{backgroundColor:"#fff",padding:35,borderRadius:20}}>
              <TextField
                label="de"
                type="date"
                value={fromDate}
                onChange={handleFromDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                margin="normal"
              />
              <TextField
                label="a"
                type="date"
                value={toDate}
                onChange={handleToDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                margin="normal"
              />
              <Grid sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button type="submit" variant="outlined" endIcon={<TelegramIcon />} color="success">Demander</Button>
              </Grid>
            </form>
          </TabPanel>
          <TabPanel value="2">
            <TableContainer component={Paper}>
              <Table>
                <CustomTableHead>
                  <TableRow>
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
                      <TableCell>{formatDate(row.date_debut)}</TableCell>
                      <TableCell>{formatDate(row.date_fin)}</TableCell>
                      <TableCell>{<Chip label={!row.validation && !row.refuser && !row.annulation ? "en cours" : row.validation ? "valider" : row.refuser ? "refuser" : row.annulation ? "annuler" : null} color={!row.validation && !row.refuser && !row.annulation ? "info" : row.validation ? "success" : row.refuser ? "error" : row.annulation ? "error" : null} />}</TableCell>
                      <TableCell sx={{ p: 0, textAlign: "center" }}>
                        {!row.validation && !row.refuser && !row.annulation ?
                          <Container sx={{ display: "flex", columnGap: 1, justifyContent: "center" }}>
                            <Button variant="outlined" color="error" onClick={() => handleannuler(row.id_demande)}>
                              annuler
                            </Button>
                          </Container>
                          : <h3>pas d'action</h3>
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
          </TabPanel>
        </LabTabsConge>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert variant="standard" onClose={handleClose} severity={snackv} sx={{ width: '100%' }}>
            {snackmsg}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
};

export default DemandeConge;
