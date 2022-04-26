import React from 'react';
import {
    createMuiTheme,
    ThemeProvider,
    makeStyles,
} from '@material-ui/core/styles';
import NavBar from './components/NavBar';
import Grid from './components/Grid';
import LoginButton from './components/LoginButton';
import EditIcon from '@material-ui/icons/Edit';

const theme = createMuiTheme({
    pallette: {
        primary: {
            main: '#c7d8ed',
        },
        secondary: {
            main: '#d80032',
        },
    },
    typography: {
        fontFamily: ['Montserrat'],
        h4: {
            fontWeight: 600,
            fontSize: 28,
            lineHeight: '2rem',
        },
        h5: {
            fontWeight: 100,
            lineHeight: '2rem',
        },
    },
});

const styles = makeStyles({
    wrapper: {
        width: '65%',
        margin: 'auto',
        textAlign: 'center',
    },
    bigSpace: {
        marginTop: '5rem',
    },
    littleSpace: {
        marginTop: '2.5rem',
    },
    grid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
});

function Home() {
    const classes = styles();
    return (
        <div className='Home'>
            <h2 style={{ fontFamily: "Montserrat"}}>Login using your Google account, then input your car's license plate and your handicap needs.</h2>
            <LoginButton />
            <div className={`${classes.grid}`}>
                <Grid
                    icon={
                        <EditIcon
                            style={{
                                fill: '#c32a2a',
                                height: '100',
                                width: '100',
                            }}
                        />
                    }
                    title=''
                    btnNavLink='/input_details'
                    btnTitle='Add your Car Info'
                />
            </div>
        </div>
    );
}

export default Home;
