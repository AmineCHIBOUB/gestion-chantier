import React from 'react';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {styled } from '@mui/material';
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
} from '@mui/material';

import { Link } from 'react-router-dom';

export const CrudP = (props) => {
    const navigate = useNavigate()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [rows, setrows] = useState([]);
    const [message, setmessage] = useState("")
    const param = useParams()

    const [open, setOpen] = useState(false);
    const [snackmsg, setsnackmsg] = useState("")
    const [snackv, setsnackv] = useState("")

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

    const getusers = () => {
        axios.get('http://localhost:8000/api/user', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
        })
            .then((res) => {
                if (!res.data.error) {
                    setrows(res.data.users)
                    setLoading(false)
                } else {
                    setmessage(res.data.message)
                    setLoading(false)
                }
            })
    }
    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("userData"))
        if (userdata.type_user.label === 'Colaborateur') {
            navigate("/404")
        }
        getusers()
    }, [])
    const handleNotif = () => {
        props.getNotification()
    }

    const handleDelete = (id_user) => {
        axios.delete("http://localhost:8000/api/user/" + id_user)
            .then(() => {
                setOpen(true)
                setsnackmsg("perssone bien supprimer")
                setsnackv("error")
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
                    <Grid item >
                        <h1>Gestion personnel</h1>
                        <Link to="/AddPerson" style={{ textDecoration: 'none' }}>
                            <Button variant="outlined" style={{ marginBottom : '15px' }}>
                            Ajouté un Personnel<AddIcon />
                            </Button>
                        </Link>
                        <TableContainer component={Paper}>

                            <Table aria-label="example table">
                                <CustomTableHead>
                                    <TableRow>
                                        <BoldTableCell>ID</BoldTableCell>
                                        <BoldTableCell>Nom</BoldTableCell>
                                        <BoldTableCell>Prénom</BoldTableCell>
                                        <BoldTableCell>CIN</BoldTableCell>
                                        <BoldTableCell>Type</BoldTableCell>
                                        <BoldTableCell>Action</BoldTableCell>
                                    </TableRow>
                                </CustomTableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows
                                    ).map((row) => (
                                        <TableRow key={row.id_user}>
                                            <TableCell>{row.id_user}</TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.prenom}</TableCell>
                                            <TableCell>{row.cin}</TableCell>
                                            <TableCell>{row.type_user !== null ? row.type_user.label : "pas de role"}</TableCell>
                                            <TableCell sx={{ display: "flex", justifyContent: "center", columnGap: 1 }}>
                                                <Link to={`/UpdatePerson/${row.id_user}`} style={{ textDecoration: 'none' }}>
                                                    <Button variant="outlined" color='warning'>
                                                        <EditIcon />
                                                    </Button>
                                                </Link>
                                                <Button variant="outlined" color='error' onClick={() => handleDelete(row.id_user)}>
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
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert variant="standard" onClose={handleClose} severity={snackv} sx={{ width: '100%' }}>
                    {snackmsg}
                </Alert>
            </Snackbar>
        </>
    )
}
