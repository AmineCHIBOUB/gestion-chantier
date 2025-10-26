
import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { DateRange, Notifications } from '@mui/icons-material';

const Notification = ({ title, date, chantier }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('fr-fr', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).replace(',', '');

    return formattedDate;
  };

  const isAjouter = /ajouté|ajouter/i.test(title);
  const isSupprime = /supprimé|supprimer/i.test(title);
  const isModifie = /modifié|modifier|changer/i.test(title);

  const cardStyle = {
    marginBottom: 16,
    backgroundColor: isSupprime ? '#ff9494' : (isAjouter ? '#D0F288' : (isModifie ? '#F6D776' : 'white')),
  };

  return (
    <Card style={cardStyle}>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <Typography style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 8 }}>
            {title}
          </Typography>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, verticalAlign: "bottom" }}>
          <DateRange style={{ fontSize: 18, marginRight: 8 }} />
          <Typography style={{ fontSize: 14 }}>{formatDate(date)}</Typography>
        </div>
        <Typography style={{ fontSize: 16, marginLeft: 10 }}><b>Chantier:</b>{chantier}</Typography>
      </CardContent>
    </Card>
  );
};

export default Notification;
