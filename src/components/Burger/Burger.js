import React from 'react';
import styles from './Burger.module.css';
import Ingredient from './Ingredient/Ingredient';

const burger=(props)=>{
    let ingredientList=Object.keys(props.ingredients)
        .map(igKey=>{
            return [...Array(props.ingredients[igKey])].map((_, i)=>{
                       return <Ingredient key={igKey+i} type={igKey}/>;
                    });
        }).reduce((arr,el)=>{
            return arr.concat(el)
        },[]);
        if(ingredientList.length===0){
            ingredientList=<p>Waiting for your order</p>
        }
    return(
        <div className={styles.Burger}>
            <Ingredient type="bread-top"/>
            {ingredientList}
            <Ingredient type="bread-bottom"/>
        </div>

    );
};

export default burger;