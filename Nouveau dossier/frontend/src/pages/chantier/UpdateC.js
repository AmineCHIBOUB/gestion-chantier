import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Tabupdatechentier from '../../components/Tabupdatechentier';
import TabPanel from '@mui/lab/TabPanel';
import { DetailPage } from '../detail/DetailPage';
import Plan from '../../components/Plan';
import TelegramIcon from '@mui/icons-material/Telegram';
import Autorisation from '../../components/Autorisation';
import Cr from '../../components/Crs';
import Certification from '../../components/Certification';
import Planning from '../../components/Planning';
const UpdateChantier = (props) => {

  const [nom_chantier, setName] = useState('');
  const navigate = useNavigate();

  const param = useParams()
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userData"))
    if(userdata.type_user.label === 'Colaborateur'){
      navigate("/404")
    }
    axios.get('http://localhost:8000/api/chantier' + param.id)
      .then((res) => {
        setName(res.data.nom_chantier);
      })
  }, [])

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = {
      nom_chantier: nom_chantier,
    };

    axios.put("http://localhost:8000/api/chantier/update/" + param.id, data)
      .then((res) => {
        console.log('Data updated successfully:', res.data);
        navigate('/ManagementPersonne');
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };
  return (
    <Container >
      <Box textAlign="center" mt={10} >
        <Typography variant="h4">Modifier Chantier</Typography>
      </Box>
      <form onSubmit={handleUpdate}>
        <Box mt={3}>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={nom_chantier}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
      <Grid sx={{display:"flex" , justifyContent:"center",mt:2}}>
      <Button variant="outlined" endIcon={<TelegramIcon/>} color="success" type="submit">
        Modifier
      </Button>
      </Grid>
        </Box>
      </form>
      <Tabupdatechentier>
        <TabPanel value='1'>
          <DetailPage/>
        </TabPanel>
        <TabPanel value='2'>
          <Plan chantier={nom_chantier} idch={param.id} getNotification={props.getNotification} />
        </TabPanel>
        <TabPanel value='3'>
          <Autorisation chantier={nom_chantier} idch={param.id} />
        </TabPanel>
        <TabPanel value='5'>
          <Cr chantier={nom_chantier} idch={param.id} />
        </TabPanel>
        <TabPanel value='4'>
          <Certification chantier={nom_chantier} idch={param.id} />
        </TabPanel>
        <TabPanel value='6'>
          <Planning chantier={nom_chantier} idch={param.id} />
        </TabPanel>
      </Tabupdatechentier>
    </Container>
  );
};

export default UpdateChantier;
