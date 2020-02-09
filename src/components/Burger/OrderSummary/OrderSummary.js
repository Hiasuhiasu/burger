import React from 'react';
import Aux from '../../../hoc/Auxilary';
import SpecialButton from '../../UI/Button/Button';

const orderSummary =(props)=>{
    const ingredientSummary=Object.keys(props.ingredients)
        .map(igKey=>{
        return (<li key={igKey}>
                    <span style={{textTransform:'capitalize'}}>
                        {igKey}
                    </span>
                    :{props.ingredients[igKey]}
                </li>);
        });

    return(
        <Aux>
            <h3>Yuor order</h3>
            <p>Burger with:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total price {props.price.toFixed(2)}</p>
            <p>Checkout?</p>
            <SpecialButton btnType="Danger" clicked={props.btnCancel}> Cancel</SpecialButton>
            <SpecialButton btnType="Success" clicked={props.btnBuy}>Buy it</SpecialButton>
        </Aux>
    );
};

export default orderSummary;