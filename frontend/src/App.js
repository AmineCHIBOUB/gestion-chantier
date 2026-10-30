
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom';
import TableComponent from './pages/users/Users';
import TableChantier from './pages/chantier/chantier';
import GeolocationExample from './pages/detail/detail';
import { ManagementP } from './pages/users/ManagementP';
import { Habilite } from './pages/habilite/Habilite';
import { Conge } from './pages/congee/Conge';
import { Congelist } from './pages/congee/Congelist';
import { Pointage } from './pages/pointage/Pointage';
import { AddPer } from './pages/users/addPer';
import { UpdatePer } from './pages/users/UpdatePP';
import { ManagementCh } from './pages/chantier/ManagementCh';
import { AddChantier } from './pages/chantier/AddCh';
import { Updatechan } from './pages/chantier/UpdateCh';
import { Affectation } from './pages/affectation/Affectation';
import { TableAf } from './pages/affectation/TableAf';
import { UpdateAf } from './pages/affectation/UpdateAf';
import { Listaff } from './pages/affectation/Listaff';
import NotFound from './pages/404/Notfound';
import Detc from './pages/detail/DetC';
import Dashboard from './pages/dashboard/dashboard';
import Dash from './pages/dashboard/DASH';
import { ThemeProvider, createTheme } from '@mui/material';
import { purple } from '@mui/material/colors';
function App() {

  const theme = createTheme({
    typography: {
      fontFamily: 'Cerapro, sans-serif',
      fontWeightRegular: 400,
      fontWeightBold: 700,

    },
    palette: {
      primary: {
        main: "#39345c",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        {/* <Route path='/signup' element={<Signup/>} /> */}
        <Route path='/' element={<Login/>} />
        <Route path="/ListPersonne" element ={<TableComponent/>}/>
        <Route path='/ManagementPersonne' element={<ManagementP/>}/>
        <Route path='/chantier' element={<TableChantier/>}/>
        <Route path='/habilite' element={<Habilite/>}/>
        <Route path='/detail/:id' element={<Detc/>}/>
        <Route path='/demandeconge' element={<Conge/>}/>
        <Route path='/listconge' element={<Congelist/>}/>
        <Route path='/pointage' element={<Pointage/>}/>
        <Route path='/AddPerson' element={<AddPer />} />
        <Route path='/UpdatePerson/:id' element={<UpdatePer />}/>
        <Route path='/ManagementChanier' element={<ManagementCh />} />
        <Route path='/AddChantier' element={<AddChantier />} />
        <Route path='/Updatechantier/:id' element={<Updatechan />}/>
        <Route path='/Affectation' element={<TableAf />}/> 
        <Route path='/Ajouteraffectation' element={<Affectation />}/>
        <Route path='/updateaffectation/:id' element={<UpdateAf />}/>
        <Route path='/listaffectation' element={<Listaff />}/>
        <Route path='/404' element={<NotFound />}/>
        <Route path='/dashboard' element={<Dash />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </Router>
    </ThemeProvider>
  );
}


export default App;
