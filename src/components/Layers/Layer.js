import React,{Component} from 'react';
import Aux from '../../hoc/Auxilary';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import {connect} from 'react-redux';

class Layer extends Component{
    state={
        showSideDrawer: false,
    }
    sideDrawerCloseHandler=()=>{
        this.setState({showSideDrawer:false});
    }
    toggleHandler=()=>{
        this.setState(prevState=>{
            return({showSideDrawer:!prevState.showSideDrawer});
        });
    }
    render(){
        return(
                <Aux>
                    <Toolbar
                        isAuth={this.props.isAuth}
                        menuShow={this.toggleHandler}
                    />
                     <SideDrawer 
                     isAuth={this.props.isAuth}
                     open={this.state.showSideDrawer} 
                     closed={this.sideDrawerCloseHandler}/>
                    <main className={styles.Content}>
                     {this.props.children}
                     </main>
                </Aux>);
    };
  }
  
 const mapStateToProps =state=>{
     return {
        isAuth:state.auth.token !==null
     }
 }; 

export default connect(mapStateToProps)(Layer);