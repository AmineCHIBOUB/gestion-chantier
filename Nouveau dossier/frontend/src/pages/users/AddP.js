import React, { useEffect, useState } from 'react';
import {Alert,Snackbar, TextField, Button, Typography, Box, Container, LinearProgress, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import axios from 'axios'; // Assurez-vous d'importer axios si vous l'utilisez
import { useNavigate } from 'react-router-dom';
import TelegramIcon from '@mui/icons-material/Telegram';
const AddPerson = () => {
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [cin, setCin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [types,settypes]=useState([])
  const [type,settype]=useState("Type")
  const [fonction,setfonction]=useState("Fonction")
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [snackmsg,setsnackmsg]=useState("")
  const [snackv , setsnackv] =useState("")

  useEffect(()=>{
    const userdata = JSON.parse(localStorage.getItem("userData"))
    if(userdata.type_user.label === 'Colaborateur'){
      navigate("/404")
    }
    axios.get("http://localhost:8000/api/type-user")
    .then((res)=>{
      settypes(res.data)
    })
  },[])
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePrenomChange = (e) => {
    setPrenom(e.target.value);
  };
  const handleCinChange = (e) => {
    setCin(e.target.value); 
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value); 
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value); 
  };

  const handleClose = () => {
    setOpen(false)
}
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      "name": name,
      "prenom": prenom,
      "cin": cin,
      "email": email,
      'typeUser':type,
      "password": password
    };
    axios.post("http://localhost:8000/api/user/create", data) 
      .then((res) => {
        if (res.data.error === false) {
          setOpen(true)
          setsnackmsg("perssone bien ajouter redirection dans 5s")
          setsnackv("success")
          console.log(res.data)
          setTimeout(() => {
            navigate('/ManagementPersonne');
          }, 5000);
          
        } else {
          setMessage(res.data.message);
          console.log(res)
        }
        console.log(res)
      });
  };

  return (
    <Container>
      <Box textAlign="center" mt={3}>
        <Typography variant="h4">Ajouter Personne</Typography>

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
          <TextField
            label="Prenom"
            variant="outlined"
            name="prenom"
            value={prenom}
            onChange={handlePrenomChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="CIN"
            variant="outlined"
            name="cin"
            value={cin}
            onChange={handleCinChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            margin="normal"
          />
            <InputLabel id="demo-simple-select-label">Fonction</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fonction}
              label="Fonction"
              fullWidth
              onChange={(e)=>setfonction(e.target.value)}
            >
              <MenuItem value="Fonction" selected disabled>Fonction</MenuItem>

                <MenuItem value="1">Chef chantier</MenuItem>
                <MenuItem value="1">Ouvrier</MenuItem>
          
            </Select>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Type"
              fullWidth
              onChange={(e)=>settype(e.target.value)}
            >
              <MenuItem value="Type" selected disabled>Type de persone</MenuItem>
              {types.map((type)=>
              (
                <MenuItem value={type.id_type}>{type.label}</MenuItem>
              ))}
              
            </Select>
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
          />
            <Grid sx={{display:"flex" , justifyContent:"center"}}  mt={2}>
            <Button type="submit" variant="outlined" endIcon={<TelegramIcon/>} color="success"   onClick={handleSubmit}>
              Ajouter
            </Button>
              </Grid>
        </Box>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert variant="standard" onClose={handleClose} severity={snackv} sx={{ width: '100%' }}>
                    { snackmsg}
                </Alert>
            </Snackbar>
    </Container>
  );
};

export default AddPerson;

