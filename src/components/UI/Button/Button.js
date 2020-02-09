import React from 'react';
import styles from './Button.module.css';

const specialButton =(props)=>(
    <button className={[styles.Button, styles[props.btnType]].join(' ')}
    onClick={props.clicked}>{props.children}</button>
);

export default specialButton;