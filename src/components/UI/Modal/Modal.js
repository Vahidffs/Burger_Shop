import React from 'react';
import classes from'./Modal.module.css';
import BackDrop from '../BackDrop/BackDrop';
const modal =(props) =>(
    <>
    <BackDrop show={props.purchasing} canceled={props.canceled}/>
    <div className={classes.Modal}
    style={{
        opacity: props.purchasing ? '1' : '0',
        transform: props.purchasing ? 'translateY(0)' : 'translateY(-100vh)'
    }}>
        {props.children}
    </div>
    </>
);

export default modal;