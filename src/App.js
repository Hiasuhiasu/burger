import React,{useEffect, Suspense} from 'react';
import {connect} from 'react-redux';
import './App.css';
import Layer from './components/Layers/Layer';
import BurgerBuilder from './container/burgerBuilder/BurgerBuilder';
import Logout from './container/Auth/Logout/Logout';
import {Route, Switch, Redirect} from 'react-router-dom';
import * as action from './store/actions/index';

const CheckOut = React.lazy(()=>{
  return import('./container/CheckOut/CheckOut');
});
const Orders = React.lazy(()=>{
  return import('./container/Orders/Orders');
});
const Auth = React.lazy(()=>{
  return import('./container/Auth/Auth');
});

const App = (props) => {
  useEffect(()=>{
    props.onTryAutoSignup();
  },[]);
  
    let rout =(
      <Switch>
        <Route path='/auth' render={(props)=><Auth {...props}/>}/>
        <Route path ='/' exact component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>
    );
    if(props.isAuthenticated){
      rout=<Switch>
          <Route path='/orders' render ={(props)=><Orders {...props}/>}/>
          <Route path='/auth' render={(props)=><Auth {...props}/>} />
          <Route path ='/checkout' render={(props)=><CheckOut {...props}/>}/>
          <Route path='/logout' component={Logout}/>
          <Route path ='/' exact component={BurgerBuilder}/>
          <Redirect to='/'/>
        </Switch>
    }
  return (
    <div >
      <Layer>
          <Suspense fallback={<p>Loadin...</p>}>{rout}</Suspense> 
      </Layer>
    </div>
  );
};

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
