// src/Login.js

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  Chip  from '@mui/material/Chip';
import { useNavigate } from 'react-router';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message,setMessage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    
    const checkToken = async () => {

        const token = localStorage.getItem('token');
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (token&& userData) {
          axios.post(
            'http://localhost:9090/user/verifyToken',
            {"email":userData.email},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ).then((res)=>{
            if (res.data.valid) {
              if(userData.type_user.label === "Colaborateur"){
                navigate('/listaffectation')
              }else{
                navigate('/listPersonne')
              }
              
            } else {
              setLoading(false);
            }
          });
        } else {
          setLoading(false);
        }
    };

    checkToken();
  }, []);




  const handleLogin =  (e) => {

    
    setLoading(true)
    e.preventDefault();
    let data = {
      "email":email,
      "password":password
    }
      axios.post(
        'http://localhost:8000/api/user/login',
          data,
      ).then((res)=>{
      if (res.data.error === false) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userData', JSON.stringify(res.data.user));
        
        if(res.data.user.type_user.label === "Colaborateur"){
          navigate('/listaffectation')
        }else{
          navigate('/listPersonne')
        }
        setLoading(false)
      } else {
        setMessage(res.data.message);
        setLoading(false)
      }
      })
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (loggedIn) {
    navigate('/listPersonne')
  }
  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.yuliagroup.com/">
      YuliaGroup.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    );
  }
  return (
    <Container component="main" maxWidth="xs" sx={{backgroundColor:"#fff",padding:2,borderRadius:5,marginTop:5}}>
      
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {message !== null ?
        <Box sx={{ mt: 1 }}>
          <Chip label={message} color="error" /> 
        </Box>: null}
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            type='email'
            id="email"
            label="Email Address"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            name="email"
            variant="outlined"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            minRows={8}
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color='primary'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Login;
