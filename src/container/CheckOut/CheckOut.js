import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckSummary from '../../components/Order/ChheckSummary/CheckSummary';
import ContactData from './ContactData/ContactData';

const CheckOut = props => {
        const query=new URLSearchParams(props.location.search);
        const ingredients={};
        for(let param of query){
            if(param[0] === 'price'){
                price=param[1];
            } else{
                ingredients[param[0]]=+param[1];
            }  
        }

    const cancelCheckoutHandler=()=>{
        props.history.goBack();
    }
    const continueCheckOutHandler=()=>{
        props.history.replace('/checkout/contact-data');
    }
        let summary =<Redirect to='/'/>
        if(props.ings){
            const purchasedRedirect =props.purchased ? <Redirect to='/'/>:null;
            summary=(
            <div>
                {purchasedRedirect}
                <CheckSummary 
                    ingredients={props.ings}
                    cancelCheckout={cancelCheckoutHandler}
                    continueCheckOut={continueCheckOutHandler}
                />
                <Route 
                    path={props.match.path + '/contact-data'} 
                    component={ContactData}/>
            </div>)
        }
        return summary;
}

const mapStateToProps =state=>{
    return{
        ings: state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        purchased:state.order.purchased
    }
}

export default connect(mapStateToProps)(CheckOut);