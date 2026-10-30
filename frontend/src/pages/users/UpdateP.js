import React, { useState, useEffect } from 'react';
import {Alert,Snackbar, TextField, Button, Typography, Box, Container, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TelegramIcon from '@mui/icons-material/Telegram';
const UpdatePerson = (props) => {

  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [cin, setCin] = useState("");
  const [restraction, setrestraction] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const param = useParams()
  const [types,settypes]=useState([])
  const [loading , setLoading ] = useState(true)
  const [type,settype]=useState("Type")
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [snackmsg,setsnackmsg]=useState("")
  const [snackv , setsnackv] =useState("")

  const [fonction,setfonction]=useState("Fonction")

  const handleClose = () => {
    setOpen(false)
}
  useEffect(()=>{
    const userdata = JSON.parse(localStorage.getItem("userData"))
    if(userdata.type_user.label === 'Colaborateur'){
      navigate("/404")
    }
      axios.get("http://localhost:8000/api/type-user")
      .then((res)=>{
        settypes(res.data)
        setLoading(false)
      })

    axios.get('http://localhost:8000/api/user/'+param.id,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    })
    .then((res)=>{

        setName(res.data.user.name);
        if(res.data.typeUser){
          settype(res.data.user.typeUser.id_type)
        }
        
        setPrenom(res.data.user.prenom);
        setCin(res.data.user.cin);
        setEmail(res.data.user.email);
        setrestraction(res.data.user.restraction)
        const timer = setTimeout(() => {
          setEmail(res.data.email);
          setPassword("")
        }, 300);
        return () => clearTimeout(timer);
    })
  },[])

  const handleUpdate = (e) => {
    let data;
    if(password === ""){
       data = {
        name: name,
        prenom: prenom,
        cin: cin,
        email: email,
        typeUser:type,
        restraction:restraction,
      };
    }else{
       data = {
        name: name,
        prenom: prenom,
        cin: cin,
        email: email,
        typeUser:type,
        restraction:restraction,
        password: password,
      };
    }
    e.preventDefault();


    axios.put("http://localhost:8000/api/user/"+param.id, data)
      .then((res) => {
        setOpen(true)
        setsnackmsg("perssone bien changer  redirection dans 5s")
        setsnackv("info")
        console.log('Data updated successfully:', res.data);
        setTimeout(() => {
          navigate('/ManagementPersonne');
        }, 5000);
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };
  return (
    <Container>
      <Box textAlign="center" mt={3}>
        <Typography variant="h4">Modifier Personnne</Typography>
      </Box>
      <form >
        <Box mt={3}>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Prenom"
            variant="outlined"
            name="prenom"
            value={prenom}
            onChange={(e)=>setPrenom(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="CIN"
            variant="outlined"
            name="cin"
            value={cin}
            onChange={(e)=>setCin(e.target.value)}
            fullWidth
            margin="normal"
          />
                      <TextField
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={email}
                        autoComplete='new-email' // Unique value for autocomplete
                        onChange={(e)=>setEmail(e.target.value)}
                        inputProps={{
                          autoComplete: 'new-email', // Set for auto-complete
                          'data-testid': 'email-input', // Add a custom attribute
                        }}
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

            <InputLabel id="demo-simple-select-label">Restriction</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              value={restraction}
              label="Restriction"
              onChange={(e)=>setrestraction(e.target.value)}
            >
              <MenuItem value={true}>oui</MenuItem>
              <MenuItem value={false}>non</MenuItem>
            </Select>

          <TextField
            label="Password"
            variant="outlined"
            name="pass"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            fullWidth
            autoComplete='off'
            margin="normal"
          />
            <Grid sx={{display:"flex" , justifyContent:"center"}}  mt={2}>
            <Button type="submit" variant="outlined" endIcon={<TelegramIcon/>} color="success"   onClick={handleUpdate}>
              Modifier
            </Button>
              </Grid>
        </Box>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert variant="standard" onClose={handleClose} severity={snackv} sx={{ width: '100%' }}>
                    {snackmsg}
                </Alert>
            </Snackbar>
    </Container>
  );
};

export default UpdatePerson;
