import React from 'react';
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
    Button,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MapIcon from '@mui/icons-material/Map';
import { useNavigate } from 'react-router';
import styled from '@emotion/styled';

export const ContenuChantier = (props) =>{
    const navigate = useNavigate()
    const [filteredRows, setFilteredRows] = useState([]); 
    const [loading , setLoading]= useState(true);
    const [rows , setrows] = useState([]);
    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem("userData"))
        if(user.type_user.label !== 'Colaborateur'){
            axios.get('http://localhost:8000/api/chantiers')
            .then((res)=>{
                setLoading(false)
                setrows(res.data)
                
            })
        }else{
          
          axios.get('http://localhost:8000/api/chantier/'+user.id_user) // Replace 'your-endpoint' with your specific endpoint
          .then((res)=>{
            setLoading(false)
            setrows(res.data)
            
        })
        }
    },[])

    const showOnMap = (latitude,longitude) => {
        if (latitude !== null && longitude !== null) {
          const mapLink = 'https://www.google.com/maps?q='+latitude+','+longitude;
          window.open(mapLink, "_blank");
        } else {
          alert("Location information is not available.");
        }
      };


    useEffect(() => {
        const filtered = rows.filter(row =>
          row.nom_chantier.toLowerCase().includes(props.nameFilter.toLowerCase())
        );
        setFilteredRows(filtered);
      }, [props.nameFilter,  rows]);
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
        <Grid container justifyContent="center">
            <Grid item xs={12} md={10}>
            <h1>Liste des chantiers</h1>
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
                        {filteredRows.map((row) => (
                            <>
                            <TableRow key={row.id_Chantier}>
                                <TableCell>{row.id_Chantier}</TableCell>
                                <TableCell>{row.nom_chantier}</TableCell>
                                
                                <TableCell>
                                    <Grid sx={{display:"flex",justifyContent:"center" , columnGap:2}}>
                                {row.localisation ? (
                (() => {
                    let localisation;
                    try {
                        localisation = JSON.parse(row.localisation);
                    } catch (error) {
                        // Handle JSON parsing error (invalid JSON format)
                        console.error('Error parsing localisation:', error);
                    }

                    if (
                        localisation &&
                        localisation.latitude !== null &&
                        localisation.longitude !== null &&
                        localisation.latitude !== "" &&
                        localisation.longitude !== ""
                    ) {
                        return (
                            <Button
                                color="inherit"
                                onClick={() => showOnMap(localisation.latitude, localisation.longitude)}
                                variant="outlined"
                            >
                                <MapIcon/>
                            </Button>
                        )
                    } 
                })()
            ): <h3>No Location</h3>}
                <Button
                                color="inherit"
                                onClick={()=>navigate('/detail/'+row.id_Chantier)}
                                variant="outlined"
                            >
                                <VisibilityIcon/>
                            </Button>
            </Grid>
                                </TableCell>
                            </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
        </TableContainer>
        </Grid>
        </Grid>}
        </>
    )
}