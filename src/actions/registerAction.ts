import {ThunkDispatch} from 'redux-thunk';
import {AxiosResponse} from 'axios';
import formurlencoded from 'form-urlencoded';
import {push} from 'connected-react-router';

import {Post} from '../util/apiFactory';

const REGISTER_URL = '/api/user/register';

export const REGISTER_START = 'register/REGISTER_START';
export const REGISTER_SUCCESS = 'register/REGISTER_SUCCESS';
export const REGISTER_FAIL = 'register/REGISTER_FAIL';

export interface RegisterResponse {
    code: number;
    message: string;
};

export type RegisterStartAction = { type: string };
export type RegisterSuccessAction = { type: string, payload: string };
export type RegisterFailAction = { type: string, payload: Error };
export type RegisterAction = RegisterStartAction | RegisterSuccessAction | RegisterFailAction;

export const registerAction = (registerData: any) => {
    return (dispatch: ThunkDispatch<any, any, RegisterAction>) => {
        dispatch({type: REGISTER_START});
        return Post(REGISTER_URL, formurlencoded(registerData)).then((response: AxiosResponse<RegisterResponse>) => {
            if (response.status === 200) {
                dispatch({type: REGISTER_SUCCESS});
                dispatch(push('/login'));
            } else {
                throw Error(`registerAction: register failed, response code ${response.status}`);
            }
        }).catch(err => dispatch({type: REGISTER_FAIL, payload: err}));
    };
};
