import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Container, LinearProgress, Grid } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TelegramIcon from '@mui/icons-material/Telegram';
const AddChan = () => {
  const [name, setName] = useState('');;
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  useEffect(()=>{
    const userdata = JSON.parse(localStorage.getItem("userData"))
    if(userdata.type_user.label === 'Colaborateur'){
      navigate("/404")
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      "nom_chantier": name,
      "localisation ":"fkrk"
    };
    axios.post("http://localhost:8000/api/chantier/create", data)
      .then((res) => {
        if (res.data.error === false) {
          setMessage(res.data.msg);
          navigate('/ManagementChanier');
        } else {
          setMessage(res.data.msg);
        }
      });
  };

  return (
    <Container>
      <Box textAlign="center" mt={3}>
        <Typography variant="h4">Add Chantier</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box mt={3}>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={name}
            onChange={handleNameChange}
            fullWidth
            margin="normal"
          />
      <Grid sx={{display:"flex" , justifyContent:"center",mt:2}}>
      <Button variant="outlined" endIcon={<TelegramIcon/>} color="success" type="submit">
        Ajouter
      </Button>
      </Grid>
        </Box>
      </form>
    </Container>
  );
};

export default AddChan;