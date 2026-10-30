
import { Container, TextField } from '@mui/material';
import Maintemplate from '../home/Maintemplate';
import { ContenuChantier } from './TableChantier';
import { useState } from 'react';
const Filtere = ({ setNameFilter})=>{
    const [nameInput, setNameInput] = useState('');
    const handleNameInputChange = (e) => {
        setNameInput(e.target.value);
        setNameFilter(e.target.value);
      };
    
    return(
        <Container sx={{display:"flex",flexDirection:"column",p:2}}>
      <TextField
        label="name"
        placeholder="name"
        value={nameInput}
        onChange={handleNameInputChange}
      />
      </Container>
    )
}


const TableChantier = () => {
    const [nameFilter, setNameFilter] = useState('');

    return (
        <Maintemplate filters={<Filtere setNameFilter={setNameFilter}/>}>
        {(getNotification)=>(
                <ContenuChantier getNotification={getNotification} nameFilter={nameFilter}/>
        )}
        </Maintemplate>
    );
};

export default TableChantier;
