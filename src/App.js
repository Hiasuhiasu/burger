import React,{Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import Layer from './components/Layers/Layer';
import BurgerBuilder from './container/burgerBuilder/BurgerBuilder';
import CheckOut from './container/CheckOut/CheckOut';
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/Logout';
import Orders from './container/Orders/Orders';
import {Route, Switch, Redirect} from 'react-router-dom';
import * as action from './store/actions/index';

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  
  render(){
    let rout =(
      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path ='/' exact component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>
    );
    if(this.props.isAuthenticated){
      rout=<Switch>
          <Route path='/orders' component={Orders}/>
          <Route path ='/checkout' component={CheckOut}/>
          <Route path='/logout' component={Logout}/>
          <Route path ='/' exact component={BurgerBuilder}/>
        </Switch>
    }
  return (
    <div >
      <Layer>
        {/* <Switch>
          <Route path='/orders' component={Orders}/>
          <Route path ='/checkout' component={CheckOut}/>
          <Route path='/auth' component={Auth}/>
          <Route path='/logout' component={Logout}/>
          <Route path ='/' exact component={BurgerBuilder}/>
        </Switch> */}
        {rout}
      </Layer>
    </div>
  );
}
}
const mapPropsToState =state =>{
  return{
    isAuthenticated: state.auth.token
  }
}
const mapDispatchToProps =dispatch=>{
  return{
    onTryAutoSignup:()=>dispatch(action.authCheckState())
  };
};
export default connect(mapPropsToState,mapDispatchToProps)(App);
