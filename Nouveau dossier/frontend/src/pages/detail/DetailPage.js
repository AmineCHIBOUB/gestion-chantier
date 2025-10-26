import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import LabTabs from '../../components/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
export const DetailPage=(props)=>{
  const navigate=useNavigate()
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [latitudeM, setLatitudeM] = useState(null);
    const [longitudeM, setLongitudeM] = useState(null);
    const [Chantiername , setChantiername ] = useState()
    const [url , seturl ] = useState()
      const param = useParams()

      function getLatLngFromGoogleMapsURL(e) {
        const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/; // Regex pattern to match latitude and longitude
        const match = e.target.value.match(regex); // Match the pattern in the URL
          
        if (match && match.length >= 3) {
          const latitude = parseFloat(match[1]); // Extract latitude
          const longitude = parseFloat(match[2]); // Extract longitude
          console.log("lat"+latitude+" logn"+longitude)
          setLatitudeM(latitude);
          setLongitudeM(longitude)
          seturl('https://www.google.com/maps?q='+latitude+','+longitude)
        } else {
          return null; // Return null if no match found
        }
      }
      
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };
  
    const showPosition = (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setLatitude(lat);
      setLongitude(lon);
      setLatitudeM(lat);
      setLongitudeM(lon)
      seturl('https://www.google.com/maps?q='+lat+','+lon)
      const localisation = {latitude:position.coords.latitude ,longitude:position.coords.longitude}
      const localisationstringify = JSON.stringify(localisation)
      axios.put('http://localhost:8000/api/chantier/update/'+param.id,{localisation:localisationstringify})
      .then((res)=>{
          console.log(res.data)
      })
    };
  
    const changelocation =()=>{
        const localisation = {latitude:latitudeM ,longitude:longitudeM}
        if(localisation.latitude === null){
            localisation.latitude = latitude
        }
        if(localisation.longitude === null){
            localisation.longitude = longitude
        }
        const localisationstringify = JSON.stringify(localisation)
        axios.put('http://localhost:8000/api/chantier/update/'+param.id,{localisation:localisationstringify})
        .then((res)=>{
            console.log(res.data)
            getlocationfromdb()
        })
    }
    const showError = (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;
          default:
            alert("An unknown error occurred.");
            break;
      }

    };
  
    const showOnMap = () => {
      if (latitude !== null && longitude !== null) {
        const mapLink = 'https://www.google.com/maps?q='+latitude+','+longitude;
        window.open(mapLink, "_blank");
      } else {
        alert("Location information is not available.");
      }
    };
    function isJSONString(str) {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    }
    const getlocationfromdb = ()=>{
        axios.get('http://localhost:8000/api/chantier/'+ param.id)
        .then((res)=>{
            const localisation = res.data.localisation
            if(isJSONString(localisation)){
                const localisationparse = JSON.parse(localisation)
                if(localisationparse.latitude !== undefined && localisationparse.latitude !== undefined ){
                  seturl('https://www.google.com/maps?q='+localisationparse.latitude+','+localisationparse.longitude)
                    setLatitude(localisationparse.latitude)
                    setLongitude(localisationparse.longitude)
                    setChantiername(res.data.nom_chantier)
                    
                }else{
                    console.log("makhdamch 1")
                }
            }else{
                console.log("makhdamch 2")
            }
        })
    }
    useEffect(() => {
      const userdata = JSON.parse(localStorage.getItem("userData"))
      if(userdata.type_user.label === 'Colaborateur'){
        navigate("/404")
      }
        getlocationfromdb()
    }, []);

    return(
        <div>
        <LabTabs>
            <TabPanel value="1">
            <Box sx={{display:"flex", justifyContent:"center"}}>
            <Button color="info" variant="outlined" onClick={getLocation}>{latitude !== null && longitude !== null && latitude !== "" && longitude !== "" ? "Changer Localisation" : "Ajouter Localisation"}</Button>
            </Box>
            
            </TabPanel>
            <TabPanel value="2">
            <Box component="form" sx={{display:"flex", rowGap:2, justifyContent:"center",flexDirection:"column", alignItems:"center"}}>
            <Grid sx={{display:"flex" , columnGap:2}}>
            <TextField id="standard-basic" label="latitude" variant="standard" value={latitudeM !== null ? latitudeM : latitude } onChange={(e)=>setLatitudeM(e.target.value)}/>
            <TextField id="standard-basic" label="longitude" variant="standard" value={longitudeM !== null ? longitudeM : longitude} onChange={(e)=>setLongitudeM(e.target.value)}/>
            </Grid>
            <Grid sx={{display:"flex"}}>
            <Button variant="outlined" color="info" onClick={changelocation} >{latitude !== null && longitude !== null && latitude !== "" && longitude !== "" ? "Changer Localisation" : "Ajouter Localisation"}</Button>
            </Grid>
            </Box>

            </TabPanel>
            <TabPanel value="3">
            <Box component="form" sx={{display:"flex", rowGap:2, justifyContent:"center",flexDirection:"column", alignItems:"center"}}>
            <Grid sx={{display:"flex" , columnGap:2}}>
            <TextField id="standard-basic" label="Url" variant="standard"  value={url} onChange={getLatLngFromGoogleMapsURL}/>
            </Grid>
            <Grid sx={{display:"flex"}}>
            <Button variant="outlined" color="info" onClick={changelocation} >{latitude !== null && longitude !== null && latitude !== "" && longitude !== "" ? "Changer Localisation" : "Ajouter Localisation"}</Button>
            </Grid>
            </Box>

            </TabPanel>
            </LabTabs>

        {latitude !== null && longitude !== null && latitude !== "" && longitude !== "" && (
            <Box sx={{display:"flex",justifyContent:"center",alignContent:"center" , flexDirection:"column",rowGap:2}}>
              <Grid sx={{display:"flex",justifyContent:"center" ,rowGap:1 , alignItems:"center" , flexDirection:"column"}}>
            <Typography variant="body1">Latitude: {latitude}</Typography>
            <Typography variant="body1">Longitude: {longitude}</Typography>
              </Grid>
              <Grid sx={{display:"flex",justifyContent:"center"}}>
            <Button variant="outlined" color="inherit" onClick={showOnMap}>
              Open Google Maps
            </Button>
              </Grid>


          </Box>
        )}
      </div>
    )
}