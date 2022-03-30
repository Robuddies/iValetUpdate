import {
    createTheme,
    ThemeProvider,
    makeStyles,
} from '@material-ui/core/styles';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './Home';
import Find from './Find';
import Park from './Park';
import Exit from './Exit';
import React from 'react';

const themey = createTheme({
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

function App() {
    const classes = styles();
    return (
        <div className='App'>
            <ThemeProvider theme={themey}>
                <div className='content'>
                    <NavBar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/park_your_car' element={<Park />} />
                        <Route path='/find_your_car' element={<Find />} />
                        <Route path='/exit_parking_lot' element={<Exit />} />
                    </Routes>
                </div>
            </ThemeProvider>
        </div>
    );
}

export default App;
