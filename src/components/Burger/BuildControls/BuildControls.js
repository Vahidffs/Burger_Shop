import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad',type:'salad'},
    {label: 'Bacon',type:'bacon'},
    {label: 'Cheese',type:'cheese'},
    {label: 'Meat',type:'meat'},
]
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(crtl => (
            <BuildControl 
            key={crtl.label} 
            label={crtl.label} 
            added={()=>props.addIng(crtl.type)} 
            del={()=>props.dellIng(crtl.type)} 
            disabled={props.disabled[crtl.type]} />
        ))}
        <button className={classes.OrderButton} disabled={!props.purchase} onClick={props.purchasing}>ORDER NOW!</button>

    </div>
);

export default buildControls;