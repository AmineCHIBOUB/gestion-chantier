import React from 'react';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useEffect,useState } from 'react';
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
import { useNavigate } from 'react-router';
import styled from '@emotion/styled';


export const TableUser=(props)=>{
  const navigate = useNavigate()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filteredRows, setFilteredRows] = useState([]); 
    const [message , setmessage] = useState("")
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const [loading , setLoading]= useState(true);
    const [rows , setrows] = useState([]);
    useEffect(()=>{
      const userdata = JSON.parse(localStorage.getItem("userData"))
      if(userdata.type_user.label === 'Colaborateur'){
        navigate("/404")
      }
        axios.get('http://localhost:8000/api/user')
        .then((res)=>{
            if(!res.data.error){
            setrows(res.data.users)
            setLoading(false)
        }else{
            setmessage(res.data.message)
            setLoading(false)
        }
        })
    },[])
    useEffect(() => {
        const filtered = rows.filter(row =>
          row.name.toLowerCase().includes(props.nameFilter.toLowerCase()) &&
          (props.restrictionFilter === '' || row.restraction === (props.restrictionFilter === 'true'))
        );
        setFilteredRows(filtered);
      }, [props.nameFilter, props.restrictionFilter, rows]);

    // const handleNotif=()=>{
    //     props.getNotification()
    // }
    const BoldTableCell = styled(TableCell)(({ theme }) => ({
      fontWeight: 'bold',
      color:'white'
    }));
    const CustomTableHead = styled(TableHead)({
      backgroundColor: '#444468', 
    });
    return(
        <>
    {loading? "loading" : 
    message === "" ? 
    <Grid container justifyContent="center">
        <Grid item xs={12} md={10}>
        <h1>Liste Personnel</h1>
    <TableContainer component={Paper}>
            <Table aria-label="example table">
                <CustomTableHead>
                    <TableRow>
                        <BoldTableCell>ID</BoldTableCell>
                        <BoldTableCell>Nom</BoldTableCell>
                        <BoldTableCell>Prénom</BoldTableCell>
                        <BoldTableCell>CIN</BoldTableCell>
                        <BoldTableCell>Restriction</BoldTableCell>
                    </TableRow>
                </CustomTableHead>
                <TableBody>
                    {(rowsPerPage > 0
            ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : filteredRows
          ).map((row) => (
                        <TableRow key={row.id_user}>
                            <TableCell>{row.id_user}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.prenom}</TableCell>
                            <TableCell>{row.cin}</TableCell>
                            <TableCell><Chip label={!row.restraction? "Non" : "Oui" } color={!row.restraction?"success":"error"} /></TableCell>
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
    :message}
    </>
    )
}