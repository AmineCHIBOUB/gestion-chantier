import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Alert, Snackbar, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import TelegramIcon from '@mui/icons-material/Telegram';
const UpdateAffectaion = () => {
  const [users, setUsers] = useState([]);
  const [chantiers, setChantiers] = useState([]);
  const [selectedDe, setSelectedDe] = useState('');
  const [selectedA, setSelectedA] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('');
  const [selectedChantier, setSelectedChantier] = useState('');

  const [open, setOpen] = useState(false);
  const [snackmsg, setsnackmsg] = useState("")
  const [snackv, setsnackv] = useState("")

  const navigate = useNavigate()
  const param = useParams()
 
  const handleClose = () => {
    setOpen(false)
}
  const dateformat = (today) => {
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
  }
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userData"))
    console.log(userdata)
    if (userdata.type_user.label === 'Colaborateur') {
      navigate("/404")
    }
    axios.get(`http://localhost:8000/api/affectations/${param.id}`).then(
      (res) => {
        console.log(res.data)
        setSelectedDe(dateformat(new Date(res.data.data.date_debut)))
        setSelectedA(dateformat(new Date(res.data.data.date_fin)))
        setSelectedPerson(res.data.data.user.id_user)
        setSelectedChantier(res.data.data.chantier.id_Chantier)
      }
    )
    axios.get('http://localhost:8000/api/user', {
    })
      .then(response => {
        console.log(response.data.users)
        // const Colaborateur = response.data.users.filter(user => user.type_user.label === 'Colaborateur');
        setUsers(response.data.users);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
    axios.get('http://localhost:8000/api/chantiers')
      .then(response => {
        setChantiers(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching chantiers:', error);
      });
  }, []);

  const handleDeChange = (event) => {
    setSelectedDe(event.target.value);
    console.log(event.target.value)
  };

  const handleAChange = (event) => {
    setSelectedA(event.target.value);
  };

  const handlePersonChange = (event) => {
    setSelectedPerson(event.target.value);
  };

  const handleChantierChange = (event) => {
    setSelectedChantier(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      chantier: selectedChantier,
      user: selectedPerson,
      date_debut: selectedDe,
      date_fin: selectedA,
    }
    axios.put("http://localhost:8000/api/affectations" + param.id, data).then((res) => {
      setOpen(true)
      setsnackmsg("Affectation bien changer  redirection dans 5s")
      setsnackv("info")
      setTimeout(() => {
        navigate("/Affectation")
      }, 5000);

    })
    console.log('Selected values:', selectedDe, selectedA, selectedPerson, selectedChantier);

  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={10}>
        <h1>Modifier Affectation</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="De"
            type="date"
            value={selectedDe}
            onChange={handleDeChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="A"
            type="date"
            value={selectedA}
            onChange={handleAChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-person-label">Person</InputLabel>
            <Select
              labelId="select-person-label"
              id="select-person"
              value={selectedPerson}
              onChange={handlePersonChange}
            >
                            {users.map(user => (
                user.type_user ? user.type_user.label === "Colaborateur"? 
                                <MenuItem key={user.id_user} value={user.id_user}>
                                {user.name + ' ' + user.prenom}
                              </MenuItem>
                              :null:null
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-chantier-label">Chantier</InputLabel>
            <Select
              labelId="select-chantier-label"
              id="select-chantier"
              value={selectedChantier}
              onChange={handleChantierChange}
            >
              {chantiers.map(chantier => (
                <MenuItem key={chantier.id_Chantier} value={chantier.id_Chantier}>
                  {chantier.nom_chantier}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="outlined" endIcon={<TelegramIcon />} color="success" type="submit">
              Modifier
            </Button>
          </Grid>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert variant="standard" onClose={handleClose} severity={snackv} sx={{ width: '100%' }}>
            {snackmsg}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
};

export default UpdateAffectaion;
