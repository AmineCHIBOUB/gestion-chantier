import * as React from "react";
import logo from '../../assets/img/logo.png'
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Fade from '@mui/material/Fade';
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Avatar, Button, Container, Menu, MenuItem, Tooltip } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
import Notification from "../../components/Notification";


const drawerWidth = 330;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "openr",
})(({ theme, open, openr }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  marginRight: -drawerWidth,
  ...(openr && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
  position: 'relative',
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "openr",
})(({ theme, open, openr }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(openr && {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
const DrawerRHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function Maintemplate(props) {

  const userData = JSON.parse(localStorage.getItem('userData'));


  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openr, setopenr] = React.useState(true);
  const navigate = useNavigate()
  const handleDrawerOpen = () => {

    setOpen(true);
  };
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleDrawerClose = () => {

    setOpen(false);
  };
  const handleDrawerROpen = () => {

    setopenr(true);
  };
  const [notif, setnotif] = React.useState([])
  const getNotification = () => {
    axios.get("http://localhost:8000/api/notification")
      .then((res) => {
        setnotif(res.data)
      })
  };

  const handleDrawerRClose = () => {

    setopenr(false);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    handleCloseUserMenu();
    axios.post('http://localhost:9090/user/Signout',
      { "email": userData.email })
      .then((res) => {
        if (res.data.error === false) {
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
          navigate('/');
        }
      })
  };

  const [anchorP, setAnchorP] = React.useState(null);
  const openP = Boolean(anchorP);
  const [anchorC, setAnchorC] = React.useState(null);
  const openC = Boolean(anchorC);
  const handleClickP = (event) => {
    setAnchorP(event.currentTarget);
  };
  const handleCloseP = () => {
    setAnchorP(null);
  };
  const handleClickC = (event) => {
    setAnchorC(event.currentTarget);
  };
  const handleCloseC = () => {
    setAnchorC(null);
  };
  React.useEffect(() => {
    getNotification()
  }, [])
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} openr={openr} color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: "62.5px", boxShadow: "none" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { visibility: "hidden" }) }}
          >
            <ChevronRightIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <img src={logo} width={70} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', columnGap: 10, ml: 10, height: "62.5px" }}>
            <Button
              color="inherit"
              aria-controls={openP ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openP ? 'true' : undefined}
              onClick={handleClickP}
              disableElevation
              endIcon={<KeyboardArrowDownIcon />}
            >
              Gestion personnel
            </Button>

            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorP}
              open={openP}
              PaperProps={{
                sx: {
                  mt: "-1px",
                  borderRadius: 0,
                  borderTop: "solid 3px #39345c"
                }
              }}
              onClose={handleCloseP}
              TransitionComponent={Fade}
            >
              {userData.type_user.label === "Colaborateur" ? null :
                <>
                  <MenuItem onClick={() => navigate("/ListPersonne")}>Liste Personnel</MenuItem>
                  <MenuItem onClick={() => navigate("/ManagementPersonne")}>Gestion personnel</MenuItem>
                </>
              }
              <MenuItem onClick={() => navigate("/listaffectation")}>Affectation</MenuItem>
              {userData.type_user.label === "Colaborateur" ? null :
                <>
                  <MenuItem onClick={() => navigate("/Affectation")}>Gestion Affectation</MenuItem>
                </>
              }
              <MenuItem onClick={() => navigate("/demandeconge")}>Demande Congé</MenuItem>
              {userData.type_user.label === "Colaborateur" ? null :
                <>
                  <MenuItem onClick={() => navigate("/listconge")}>Liste Conges</MenuItem>
                  <MenuItem onClick={() => navigate("/pointage")}>Pointage</MenuItem>
                </>
              }

            </Menu>


            <Button
              color="inherit"
              aria-controls={openC ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openC ? 'true' : undefined}
              onClick={handleClickC}
              disableElevation
              endIcon={<KeyboardArrowDownIcon />}
            >
              Gestion chantier
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorC}
              open={openC}
              PaperProps={{
                sx: {
                  mt: "-1px",
                  borderRadius: 0,
                  borderTop: "solid 3px #39345c"
                }
              }}
              onClose={handleCloseC}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={() => navigate("/chantier")}>Liste Chantier</MenuItem>
              {userData.type_user.label === "Colaborateur" ? null :
                <>
                  <MenuItem onClick={() => navigate("/ManagementChanier")}>Gestion Chantier</MenuItem>
                </>
              }

            </Menu>
            {userData.type_user.label === "Admin" ?
              <Button color="inherit" onClick={()=>navigate("/dashboard")}>
                Tableau de bord
              </Button>
              : null}

          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </Tooltip>
            <Menu
              id="account-menu"
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.4,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem disabled>
                <Typography fontWeight="600" textAlign="center">User: {userData.name}</Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => navigate("/habilite")}>
                <Typography textAlign="center">habilitations</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Signout</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerROpen}
            edge="end"
            sx={{ ml: 2, ...(openr && { visibility: "hidden" }) }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#F2F3F4"
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader />
        <DrawerHeader>
          <Typography variant="h5" sx={{ textAlign: "center", width: "85%" }}>Filtre</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {props.filters}
      </Drawer>
      <Main open={open} openr={openr} sx={{ background: "#f0eef9", height: "100%" }} >
        <DrawerHeader />
        {props.children(getNotification)}
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "#F2F3F4"
          },

        }}
        variant="persistent"
        anchor="right"
        open={openr}
      >
        <DrawerRHeader />
        <DrawerRHeader>
          <IconButton onClick={handleDrawerRClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          <Typography variant="h5" sx={{ textAlign: "center", width: "85%" }}>Notification</Typography>
        </DrawerRHeader>
        <Divider />
        <Container sx={{ overflow: "scroll" }}>
          {notif.slice().reverse().map((noti) => (
            <Notification title={noti.message} date={noti.date} chantier={noti.chantier} />
          ))}
        </Container>
      </Drawer>
    </Box>
  );
}
