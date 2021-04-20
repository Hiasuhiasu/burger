import React, {Component} from 'react';
import {connect} from 'react-redux';
import Order from '../../components/Order/Order';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state={
      orders: [],
      loading: true,
    }
    componentDidMount() {
      // axios.get('orders.json')
      //     .then(res=>{
      //         const fetchOrder=[];
      //         for(let key in res.data){
      //             fetchOrder.push({
      //                 ...res.data[key],
      //                 id:key});}
      //         this.setState({loading:false,orders:fetchOrder});
      //         console.log(res.data);
      //     })
      //     .catch(err=>this.setState({loading:false}))
      this.props.onFetchOrders(this.props.token, this.props.userId);
    }
    render() {
      let order=<Spinner/>;
      if (!this.props.loading) {
        order=this.props.orders.map((order)=>(
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ) );
      }
      return (
        <div>
          {order}
        </div>
      );
    }
}
const mapStateToProps =(state)=>{
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps=(dispatch)=>{
  return {
    onFetchOrders: (token, userId)=>dispatch(
        actions.fethcOrders(token, userId)),
  };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withErrorHandler(Orders, axios));
