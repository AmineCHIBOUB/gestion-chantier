import React from 'react';
import Maintemplate from '../home/Maintemplate';
import { TableUser } from './Table';
import { useState } from 'react';
import { Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';


const Filtere = ({ setNameFilter, setRestrictionFilter })=>{
    const [nameInput, setNameInput] = useState('');
    const [restrictionInput, setRestrictionInput] = useState('');
    const handleNameInputChange = (e) => {
        setNameInput(e.target.value);
        setNameFilter(e.target.value);
      };
    
      const handleRestrictionInputChange = (e) => {
        setRestrictionInput(e.target.value);
        setRestrictionFilter(e.target.value);
      };
    return(
        <Container sx={{display:"flex",justifyContent:"center",flexDirection:"column" , p:2 , rowGap:2}}>
      <TextField
        label="Filter by name"
        placeholder="Filter by name"
        value={nameInput}
        onChange={handleNameInputChange}
      />
        <FormControl>
        <InputLabel>Restriction</InputLabel>
        <Select
          value={restrictionInput}
          onChange={handleRestrictionInputChange}
        >
          <MenuItem value="">Tout</MenuItem>
          <MenuItem value="true">Oui</MenuItem>
          <MenuItem value="false">Non</MenuItem>
        </Select>
        </FormControl>
      </Container>
    )
}

const TableComponent = () => {
    const [nameFilter, setNameFilter] = useState('');
    const [restrictionFilter, setRestrictionFilter] = useState('');
    
    return (
        <Maintemplate filters={<Filtere setNameFilter={setNameFilter} setRestrictionFilter={setRestrictionFilter}/>}>
            {(getNotification)=>(
                <TableUser getNotification={getNotification} nameFilter={nameFilter} restrictionFilter={restrictionFilter}/>
        )}
        </Maintemplate>
    );
};

export default TableComponent;
