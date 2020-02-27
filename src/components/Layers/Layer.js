import React,{ useState} from 'react';
import Aux from '../../hoc/Auxilary';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import {connect} from 'react-redux';

const Layer =props=>{
    const [showSideDrawer, setShowSideDrawer]=useState(false);
    const sideDrawerCloseHandler=()=>{
        setShowSideDrawer(false);
    }
    const toggleHandler=()=>{
        setShowSideDrawer(!showSideDrawer);
    }
        return(
                <Aux>
                    <Toolbar
                        isAuth={props.isAuth}
                        menuShow={toggleHandler}
                    />
                     <SideDrawer 
                     isAuth={props.isAuth}
                     open={showSideDrawer} 
                     closed={sideDrawerCloseHandler}/>
                    <main className={styles.Content}>
                     {props.children}
                     </main>
                </Aux>);
    };
  
 const mapStateToProps =state=>{
     return {
        isAuth:state.auth.token !==null
     }
 }; 

export default connect(mapStateToProps)(Layer);