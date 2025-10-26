import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import LabTabs from '../../components/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Tabupdatechentier from '../../components/Tabupdatechentier';
import { DetailPage } from './DetailPage';
import Plan from '../../components/Plan';
import Autorisation from '../../components/Autorisation';
import TableDetail from '../../components/TableDetail';
import PlanCh from '../../components/PlacCh';
import AutorisationCh from '../../components/AutorisationCh';
export const DetailPageCh=(props)=>{
    const [chantiernom , setchantiernom]=useState('')
    const param = useParams()
    useEffect(()=>{
        axios.get("http://localhost:8000/api/chantier/"+param.id)
        .then((res)=>{
            setchantiernom(res.data.nom_chantier)
        })
    })
    return(
        <Grid container justifyContent="center">
        <Grid item xs={12} md={10}>
            <h1>Detail de Chantier: {chantiernom}</h1>
      <TableDetail>
        <TabPanel value='1'>
          <PlanCh chantier={chantiernom} idch={param.id} getNotification={props.getNotification} />
        </TabPanel>
        <TabPanel value='2'>
          <AutorisationCh chantier={chantiernom} idch={param.id} />
        </TabPanel>
      </TableDetail>
      </Grid>
      </Grid>
    )
}