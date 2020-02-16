import reducer from './auth';

import * as actionType from '../actions/actonType';

describe('auth reducer', ()=>{
    it('shuold return initial state',()=>{
        expect(reducer(undefined, {})).toEqual({
            token:null,
            userId:null,
            error:null,
            loading:false,
            authRedirect: '/'
        });
    });
    it('should store the token', ()=>{
        expect(reducer({
            token:null,
            userId:null,
            error:null,
            loading:false,
            authRedirect: '/'
        }, {type:actionType.AUTH_SUCCESS,
            idToken:'some-token',
            userId:'some-id'
        })).toEqual({
            token:'some-token',
            userId:'some-id',
            error:null,
            loading:false,
            authRedirect: '/'
        });
    });
})