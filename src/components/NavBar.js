import React from 'react';
import logo from '../iValet.png';
import CustomButton from './CustomButton';
import { Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


const styles = makeStyles({
    bar: {
        paddingTop: '1.15rem',
        backgroundColor: '#c32a2a',
        ['@media (max-width:500px)']: {
            flexDirection: 'column',
        },
    },
    logo: {
        width: '15%',
        ['@media (max-width:500px)']: {
            display: 'none',
        },
    },
    menuItem: {
        cursor: 'pointer',
        flexGrow: 1,
        color: '#ffd700',
        //   "&:hover": {
        //       color:  "#ffd700"
        //   },
        ['@media (max-width:500px)']: {
            paddingBottom: '1rem',
        },
    },
});

const linkStyle = {
    margin: '1rem',
    textDecoration: 'none',
    color: '#ffd700',
};

function NavBar() {
    const classes = styles();
    return (
        <Toolbar
            position='sticky'
            color='rgba(255, 215, 0)'
            className={classes.bar}
        >
            <img src={logo} className={classes.logo} />

            <Typography variant='h6' className={classes.menuItem}>
                <Link to='/' style={linkStyle}>
                    <b>Home</b>{' '}
                </Link>
            </Typography>
            <Typography variant='h6' className={classes.menuItem}>
                <Link to='/park_your_car' style={linkStyle}>
                    <b>Park Your Car</b>
                </Link>
            </Typography>
            <Typography variant='h6' className={classes.menuItem}>
                <Link to='/find_your_car' style={linkStyle}>
                    <b>Find Your Car</b>
                </Link>
            </Typography>

            <CustomButton Link='/contact'txt='Contact Us' />
        </Toolbar>
    );
}

export default NavBar;
