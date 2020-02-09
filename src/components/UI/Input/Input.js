import React from'react';
import styles from './Input.module.css';

const input = (props)=>{
    let inputElement=null;
    const inputClasses=[styles.InputElement];
    if(props.invalid && props.shouldValid){
        inputClasses.push(styles.Invalid);
    }

    switch(props.elementType){
        case('input'):
            inputElement=<input className={inputClasses.join(' ')} 
            {...props.elementConfig} defaultValue={props.value}
            onChange={props.changeValue}/>;
            break;
        case('select'):
            inputElement=
                <select value={props.value} 
                    className={styles.InputElement}
                    onChange={props.changeValue}>
                    {props.elementConfig.options.map(option=>(
                         <option 
                            key={option.value}
                            value={option.value}>
                             {option.display}
                        </option>
                    ))}
                </select>
            break;
        case('textarea'):
            inputElement=<textarea className={styles.InputElement} 
            {...props.elementConfig} defaultValue={props.value}
            />;
            break;
        default:
            inputElement=<input onChange={props.changeValue}
            className={styles.InputElement} 
            {...props.elementConfig} defaultValue={props.value}/>;
    }
    return(
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>)
};

export default input;