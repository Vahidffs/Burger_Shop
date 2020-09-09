import React from 'react';
import Button from '../../UI/Button/Button'
const orderSummary = (props) =>{
    const  ingridientSummary = props.ingredients;
    const ingsum = Object.keys(ingridientSummary).map(key=>{
        return(
            <li key={key}>
                <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
            </li>
        );
    });
    return (
        <>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
        {ingsum}
        </ul>
        <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={props.orderCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={props.orderContinued}>CONTINUE</Button>
        </>
    );
};

export default orderSummary;