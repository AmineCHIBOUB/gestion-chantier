
import React from 'react';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import {styled } from '@mui/material';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export const CrudCh = (props) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [rows, setrows] = useState([]);
    const navigate = useNavigate()
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getusers = () => {
        axios.get('http://localhost:8000/api/chantiers')
            .then((res) => {
                setLoading(false)
                setrows(res.data)
            })
    }

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("userData"))
        if(userdata.type_user.label === 'Colaborateur'){
          navigate("/404")
        }
        getusers()
    }, [])
    const handleNotif = () => {
        props.getNotification()
    }
    const handleDelete = (id_Chantier) => {
        axios.delete("http://localhost:8000/api/chantier/" + id_Chantier)
            .then(() => {
                getusers()
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
            {loading ? "loading" :
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={10}>
                        <h1>Gestion chantier</h1>
                        <Link to="/AddChantier">
                                <Button variant="outlined" style={{ marginBottom : '15px' }}>
                                Ajouté un Chantier<AddIcon />
                                </Button>
                            </Link>
                        <TableContainer component={Paper}>
                            <Table aria-label="example table">
                                <CustomTableHead>
                                    <TableRow>
                                        <BoldTableCell>ID</BoldTableCell>
                                        <BoldTableCell>Nom</BoldTableCell>
                                        <BoldTableCell>Action</BoldTableCell>
                                    </TableRow>
                                </CustomTableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows
                                    ).map((row) => (
                                        <TableRow key={row.id_Chantier}>
                                            <TableCell>{row.id_Chantier}</TableCell>
                                            <TableCell>{row.nom_chantier}</TableCell>
                                            <TableCell sx={{display:"flex", justifyContent:"center" , columnGap:1}}>
                                            <Link to={`/Updatechantier/${row.id_Chantier}`} style={{ textDecoration: 'none' }}>
                                                    <Button variant="outlined" color="warning">
                                                        <EditIcon />
                                                    </Button>
                                                </Link>
                                                <Button variant="outlined" color='error'  onClick={() => handleDelete(row.id_Chantier)}>
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
            }
        </>
    )
}