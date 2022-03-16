import React from 'react'
import { createMuiTheme, ThemeProvider, makeStyles} from '@material-ui/core/styles';
import NavBar from './components/NavBar'
import Grid from './components/Grid'

import Ticket from '@material-ui/icons/ConfirmationNumber';
import Key from '@material-ui/icons/VpnKey';


const theme = createMuiTheme({
    pallette:{
      primary: {
        main:"#c7d8ed",
      },
      secondary: {
        main:"#d80032"
      },
    },
    typography: {
      fontFamily: [
        'Montserrat'
      ],
      h4: {
        fontWeight: 600,
        fontSize: 28,
        lineHeight: '2rem'
      },
      h5: {
        fontWeight: 100,
        lineHeight: '2rem'
      },
    },
  });
  
  const styles = makeStyles({
    wrapper: {
      width: "65%",
      margin: "auto",
      textAlign: "center"
    },
    bigSpace: {
      marginTop: "5rem"
    },
    littleSpace:{
      marginTop: "2.5rem",
    },
    grid:{
      display: "flex", 
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap", 
    },
  })

function Home() {
    const classes = styles();
    return (
      <div className="Home">
        <div className={`${classes.grid} ${classes.bigSpace}`}>
          <Grid icon={<Key style={{fill: "#c32a2a", height:"125", width:"125"}}/>}  title="" btnTitle="Park Your Car" />
          <Grid icon={<Ticket style={{fill: "#c32a2a", height:"125", width:"125"}}/>} title="" btnTitle="Find Your Car"/>
        </div>
      </div>
    );
}

export default Home
