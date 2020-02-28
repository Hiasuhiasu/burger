import React,{useState, useEffect} from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

const INGREDIENT_PRICE={
    salad:0.3,
    cheese:0.5,
    bacon:0.4,
    meat:0.8
}
export const BurgerBuilder =props=>{
    const [purchasable, setPurchasable]=useState(true);
    const [buyIt, setBuyIt]=useState(false);

    useEffect(()=>{props.onInitIngredients();},[]);

    const checkPurchasable=(ingredients)=>{
        const sum=Object.keys(ingredients)
            .map(key=>{
                return ingredients[key];
            }).reduce((sum, el)=>{
               return sum+el
            },0);
            setPurchasable(sum>0);
    }

    const buyItHandler=()=>{
        if(props.isAuth){
            setBuyIt(true);
        }else{
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }  

    const closeChecOutHandler=()=>{
        setBuyIt(false);
    }

    const continueBuyHandler=()=>{
        const queryParam=[];
        for(let i in props.ings){
            queryParam.push(encodeURIComponent(i)+'='+encodeURIComponent(props.ings[i]));
        }
        queryParam.push('price=' + props.price);
        const queryString=queryParam.join('&');
        props.onInitPurchase();
        props.history.push({
            pathname:'/checkout',
            search:'?'+queryString
        }); 
    }

        const disableControl={...props.ings};
        for (let key in disableControl){
            disableControl[key]=disableControl[key]<=0
        }
        let orderSummary=null;
        let burger=props.errorState ?<p>Error network</p>: <Spinner/>;
        if(props.ings){
            burger=(
                <Aux>
                    <Burger ingredients={props.ings}/>
                    <BuildControls 
                    ingredientAdded={props.onAddIngredient}
                    ingredientRemove={props.onRemoveIngredient}
                    price={props.price}
                    disabled={disableControl}
                    chekOut={buyItHandler}
                    isAuth={props.isAuth}
                    purchase={purchasable}/>
                </Aux>
            );
            orderSummary=<OrderSummary 
            ingredients={props.ings}
            price={props.price}
            btnBuy={continueBuyHandler}
            btnCancel={closeChecOutHandler}/>
         }
        return(
            <Aux>
                <Modal show={buyIt}
                    hide={closeChecOutHandler}>
                        {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
}

const mapStateToProps =state=>{
    return{
        ings: state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        errorState:state.burgerBuilder.error,
        isAuth:state.auth.token !==null
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onAddIngredient: (ingName)=>dispatch(burgerBuilderActions.addIngredient(ingName)),
        onRemoveIngredient: (ingName)=>dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase:()=>dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path)=>dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}  

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));