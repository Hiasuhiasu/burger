import React,{useEffect, useState} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary';

const withErrorHandler=(WrappedComponent, axios)=>{
    return props =>{
        const [error, setError]=useState(null);

        const requestInterceptor=axios.interceptors.request.use(req=>{
            setError(null);
            return req;
        });
        const responseInterceptor=axios.interceptors.response.use(
            resp=>resp, 
            errorM=>{setError(errorM)});

        useEffect(()=>{
            return ()=>{
                axios.interceptors.request.eject(requestInterceptor);
                axios.interceptors.request.eject(responseInterceptor);
            };
        },[requestInterceptor, responseInterceptor]);
        const errorConfirmHandler=()=>{
            setError(null);
        }
            return(
                <Aux>
                    <Modal show={error}
                        hide={errorConfirmHandler}>
                        {error ? error.message: null}
                    </Modal>
                    <WrappedComponent {...props}/>
                </Aux>
            );
    }
}

export default withErrorHandler;