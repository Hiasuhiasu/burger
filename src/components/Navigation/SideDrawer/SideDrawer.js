import React from 'react';
import styles from './SideDrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary';

const sideDrawer =(props)=>{
    let attachedClasses=[styles.SideDrawer, styles.Close];
    if(props.open){
        attachedClasses=[styles.SideDrawer, styles.Open];
    }
    return(
        <Aux>
            <Backdrop show={props.open} hiden={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={styles.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;