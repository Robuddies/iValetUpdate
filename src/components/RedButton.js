import React from 'react'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
//import { getThemeProps } from '@material-ui/styles';
import { Link } from 'react-router-dom';
const StyledButton = withStyles({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "44px",
        padding: "0 25px",
        boxSizing: "border-box",
        borderRadius: 0,
        background: "#c32a2a",
        color: "#fff",
        transform: "none",
        boxShadow: "4px 4px 0 0 #b52626",
        transition: "background .3s, border-color .3s, color .3s",
        "&:hover":{
            backgroundColor: "#eb3434"

        },
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: '#ffffff'
  };


function RedButton(props){
    return(
        <Link to={props.Link} style={linkStyle}>
            <StyledButton variant="contained">{props.txt}</StyledButton>
        </Link>
    )
}
export default RedButton