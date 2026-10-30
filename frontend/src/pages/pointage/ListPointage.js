import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  CircularProgress,
  Grid,
  TablePagination,
  Chip,
  Snackbar,
  Alert,
} from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import TelegramIcon from '@mui/icons-material/Telegram';
import TabePointage from '../../components/TabePointage';
import { useNavigate } from 'react-router';
import styled from '@emotion/styled';

const ListPointage = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disabled , setdisabled] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data,setdata]=useState([])
  const [open, setOpen] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    axios.get('http://localhost:8000/api/user',
    {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
    }
    )
      .then(response => {
        if(!response.data.error){
            setUsers(response.data.users)
            axios.get('http://localhost:8000/api/pointage')
            .then((response)=>{
                setdata(response.data)
                console.log(response.data)
                if(new Date(response.data[0].date).getTime() < new Date().getTime()){
                    setdisabled(false)
                }else{
                    setdisabled(true)
                }
            });
            setLoading(false);
        }else{
            console.log(response.data)
        }

      })

  }, []);
  const handleClose = () => {
    setOpen(false)

}
useEffect(()=>{
  const userdata = JSON.parse(localStorage.getItem("userData"))
  if(userdata.type_user.label === 'Colaborateur'){
    navigate("/404")
  }
    if(disabled){
        axios.get('http://localhost:8000/api/pointage'
        )
        .then(response => {
            const updatedUsers = response.data
                .filter(row => row.presense)
                .map(row => row.user);

            setSelectedUsers(prevUsers => [...prevUsers, ...updatedUsers]);
        })
      }
},[disabled])

const dateformat=(today)=>{
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
}
const groupedData = data.reduce((acc, item) => {
    const date = new Date(item.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  const handleCheckboxChange = (event, user) => {
    const checked = event.target.checked;
    if (checked) {
      setSelectedUsers([...selectedUsers, user]);
    } else {
      setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser.id_user !== user.id_user));
    }
  };

  const handleSubmit = () => {
    users.map((user)=>{
    const today = new Date()
    const formattedDate = dateformat(today);
    const isUserSelected = selectedUsers.some(selectedUser => selectedUser.id_user === user.id_user);
    if(isUserSelected){
        axios.post('http://localhost:8000/api/pointage', {
            date:formattedDate,
            user:user.id_user,
            presense : true
        })
        .then(response => {
          console.log('Data submitted successfully:', response.data);
        })
        .catch(error => {
          console.error('Error submitting data:', error);
        });
    }else{
        axios.post('http://localhost:8000/api/pointage', {
            date:formattedDate,
            user:user.id_user,
            presense : false
        })
        .then(response => {
          console.log('Data submitted successfully:', response.data);
        })
        .catch(error => {
          console.error('Error submitting data:', error);
        });
    }
    })
    setdisabled(true)
  };
  const BoldTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    color:'white'
  }));
  const CustomTableHead = styled(TableHead)({
    backgroundColor: '#444468', 
  });
  return (
    <Grid container justifyContent="center">
    <Grid item xs={12} md={10}>
    <TabePointage>
      <TabPanel value="1">
      <h1>Pointage : {dateformat(new Date())} {disabled ? "(Envoyer)":null}</h1>
    <div>
      {loading ? (
        <CircularProgress /> // Show loading indicator while fetching data
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="user table">
            <CustomTableHead>
              <TableRow>
                <BoldTableCell>Nom</BoldTableCell>
                <BoldTableCell>CIN</BoldTableCell>
                <BoldTableCell>Presence</BoldTableCell>
              </TableRow>
            </CustomTableHead>
            <TableBody>
              {(rowsPerPage > 0
            ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : users
          ).map(user => (
                <TableRow key={user.id_user}>
                  <TableCell>{user.name +" "+user.prenom}</TableCell>
                  <TableCell>{user.cin}</TableCell>
                  <TableCell>
                    <Checkbox disabled = {disabled}
                      checked={selectedUsers.some(selectedUser => selectedUser.id_user === user.id_user)}
                      onChange={(event) => handleCheckboxChange(event, user)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
        </TableContainer>
      )}
      <Grid sx={{display:"flex",justifyContent:"center" , mt:2}}>
      <Button variant="outlined" color="success" endIcon={<TelegramIcon/>} onClick={handleSubmit} disabled ={disabled}>Envoyer</Button>
      </Grid>
      
    </div>
      </TabPanel>
      <TabPanel value="2">
      <div>
      {Object.entries(groupedData).map(([date, items]) => (
        <div key={date}>
          <h1>{dateformat(new Date(date))}</h1>
          <TableContainer component={Paper}>
            <Table>
              <CustomTableHead>
                <TableRow>
                  <BoldTableCell>Name</BoldTableCell>
                  <BoldTableCell>CIN</BoldTableCell>
                  <BoldTableCell>Presence</BoldTableCell>
                </TableRow>
              </CustomTableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id_Pointage}>
                    <TableCell>{item.user !== null ? item.user.name : null}</TableCell>
                    <TableCell>{item.user !==null ? item.user.cin : null}</TableCell>
                    <TableCell><Chip color={item.presense ? "success" : "error" } label={item.presense ? 'Present' : 'Absent'}/> </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </div>
      </TabPanel>
      </TabePointage>
      <Snackbar  open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="standard" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Piontage bien Envoyer
        </Alert>
      </Snackbar>
    </Grid>
    </Grid>
  );
};

export default ListPointage;
