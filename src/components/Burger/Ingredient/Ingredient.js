import React from 'react';
import PropTypes from 'prop-types';
import './Ingredient.css'; 

const Ingredient =props=> {
    let burgerIngredient=null;
    switch(props.type){
        case("bread-bottom"):
            burgerIngredient=<div className='BreadBottom'></div>;
            break;
        case("bread-top"):
            burgerIngredient=<div className='BreadTop'>
                <div className='Seeds1'></div>
                <div className='Seeds2'></div>
            </div>;
            break;
        case('cheese'):
            burgerIngredient=<div className='Cheese'></div>;
            break;
        case('meat'):
            burgerIngredient=<div className='Meat'></div>;
            break;
        case('salad'):
            burgerIngredient=<div className='Salad'></div>;
            break;
        case('bacon'):
            burgerIngredient=<div className='Bacon'></div>;
            break;
        default:  burgerIngredient=null;
    }
    return burgerIngredient;
};

Ingredient.propTypes={
    type: PropTypes.string.isRequired
};

export default Ingredient;