import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RedButton from './RedButton';

const styles = makeStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 0rem 0 0rem',
    },
    item: {
        paddingTop: '0rem',
    },
});

function Grid(props) {
    const { icon, title, btnTitle, btnNavLink, btnNavState } = props;
    const classes = styles();
    return (
        <div className={classes.wrapper}>
            <div className={classes.item}>{icon}</div>
            <Typography className={classes.item} variant='h5'>
                {title}
            </Typography>
            <div className={classes.item}>
                <RedButton
                    Link={btnNavLink}
                    state={btnNavState}
                    txt={btnTitle}
                />
            </div>
        </div>
    );
}

export default Grid;
