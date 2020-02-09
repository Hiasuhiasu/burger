import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls=[
    {label:'Salad', type:'salad'},
    {label:'Cheese', type:'cheese'},
    {label:'Bacon', type:'bacon'},
    {label:'Meat', type:'meat'},
];
const buildControls=(props)=>(
 <div className={styles.BuildControls}>
     <p>Total price: <strong>{props.price.toFixed(2)}</strong></p>
     {controls.map(control=>(
         <BuildControl 
         key={control.label} 
         label={control.label}
         added={()=>props.ingredientAdded(control.type)}
         remove={()=>props.ingredientRemove(control.type)}
         disabledRemove={props.disabled[control.type]}/>
     ))}
     <button 
        className={styles.OrderButton}
        disabled={!props.purchase}
        onClick={props.chekOut}
        >Check out
    </button>
 </div>   
);

export default buildControls;