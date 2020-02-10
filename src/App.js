import React,{Component} from 'react';
import './App.css';
import Layer from './components/Layers/Layer';
import BurgerBuilder from './container/burgerBuilder/BurgerBuilder';
import CheckOut from './container/CheckOut/CheckOut';
import Auth from './container/Auth/Auth';
import Orders from './container/Orders/Orders';
import {Route, Switch} from 'react-router-dom';

class App extends Component {
  render(){
  return (
    <div >
      <Layer>
        <Switch>
          <Route path='/orders' component={Orders}/>
          <Route path ='/checkout' component={CheckOut}/>
          <Route path='/auth' component={Auth}/>
          <Route path ='/' component={BurgerBuilder}/>
        </Switch>
      </Layer>
    </div>
  );
}
}

export default App;
