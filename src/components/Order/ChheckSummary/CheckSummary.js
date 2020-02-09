import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import styles from './CheckSummary.module.css';

const CheckSummary=(props)=>{
    return(
        <div className={styles.CheckSummary}>
            <h1>Buy it now</h1>
            <div style={{width:'100%',margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger"
                clicked={props.cancelCheckout}>Cancel</Button>
            <Button btnType="Success"
                clicked={props.continueCheckOut}>Buy</Button>
        </div>
    )
}

export default CheckSummary;