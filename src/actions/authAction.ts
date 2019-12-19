import {ThunkDispatch} from 'redux-thunk';
import {AxiosResponse} from 'axios';
import formurlencoded from 'form-urlencoded';
import {push} from 'connected-react-router';
import jwtDecode from 'jwt-decode'

import apiCall, {Post} from '../util/apiFactory';

const AUTH_URL = '/api/user/auth';
const CHECK_AUTH_URL = '/api/user/authenticated';
const PW_RESET_URL = '/api/user/password_reset'
const PW_FORGOT_URL = '/api/user/password_forgot'

export const LOGIN_START = 'auth/LOGIN_START';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'auth/LOGIN_FAIL';
export const LOGOUT_USER = 'auth/LOGOUT_USER';

export const PW_RESET_START = 'auth/PW_RESET_START';
export const PW_RESET_SUCCESS = 'auth/PW_RESET_SUCCESS';
export const PW_RESET_FAIL = 'auth/PW_RESET_FAIL';

export const PW_FORGOT_START = 'auth/PW_FORGOT_START';
export const PW_FORGOT_SUCCESS = 'auth/PW_FORGOT_SUCCESS';
export const PW_FORGOT_FAIL = 'auth/PW_FORGOT_FAIL';

export interface AuthResponse {
    success: boolean;
    message: string;
    token: string;
};

export interface GenericAuthResponse {
    success: boolean;
    message: string;
}

export type LoginStartAction = { type: string };
export type LoginSuccessAction = { type: string, payload: string };
export type LoginFailAction = { type: string, payload: Error };
export type LoginAction = LoginStartAction | LoginSuccessAction | LoginFailAction;
export type LogoutAction = { type: string};

export type PasswordResetStartAction = { type: string };
export type PasswordResetSuccessAction = { type: string };
export type PasswordResetFailAction = { type: string, payload: Error };
export type PasswordResetAction = PasswordResetStartAction | PasswordResetSuccessAction | PasswordResetFailAction;

export type PasswordForgotStartAction = { type: string };
export type PasswordForgotSuccessAction = { type: string };
export type PasswordForgotFailAction = { type: string, payload: Error };
export type PasswordForgotAction = PasswordForgotStartAction | PasswordForgotSuccessAction | PasswordForgotFailAction;

export const loginAction = (loginData: any) => {
    return (dispatch: ThunkDispatch<any, any, LoginAction>) => {
        dispatch({type: LOGIN_START});
        return Post(AUTH_URL, formurlencoded(loginData)).then((response: AxiosResponse<AuthResponse>) => {
            if (response.status === 201 || response.status === 200) {
                localStorage.setItem('authToken', response.data.token);
                dispatch({type: LOGIN_SUCCESS, payload: jwtDecode(response.data.token)});
                dispatch(push('/'));
            } else {
                throw Error(`loginAction: login failed, response code ${response.status}`);
            }
        }).catch(err => dispatch({type: LOGIN_FAIL, payload: err}));
    };
};

export const pwResetAction = (passwordResetData: any, pwResetToken: string) => {
    return (dispatch: ThunkDispatch<any, any, PasswordResetAction>) => {
        dispatch({type: PW_RESET_START});
        const pwResetUrl = PW_RESET_URL + '/' + pwResetToken;
        return Post(pwResetUrl, formurlencoded(passwordResetData)).then((response: AxiosResponse<GenericAuthResponse>) => {
            if (response.status === 200) {
                dispatch({type: PW_RESET_SUCCESS});
                dispatch(logoutAction());
                dispatch(push('/login'))
            } else {
                throw Error(`pwResetAction: pw reset failed, response code ${response.status}`);
            }
        }).catch(err => dispatch({type: PW_RESET_FAIL, payload: err}));
    };
};

export const pwForgotAction = (passwordForgotData: any) => {
    return (dispatch: ThunkDispatch<any, any, PasswordForgotAction>) => {
        dispatch({type: PW_FORGOT_START});
        return Post(PW_FORGOT_URL, formurlencoded(passwordForgotData)).then((response: AxiosResponse<GenericAuthResponse>) => {
            if (response.status === 200) {
                dispatch({type: PW_FORGOT_SUCCESS});
                dispatch(logoutAction());
                dispatch(push('/'))
            } else {
                throw Error(`pwForgotAction: pw forgot failed, response code ${response.status}`);
            }
        }).catch(err => dispatch({type: PW_FORGOT_FAIL, payload: err}));
    };
};

export const checkAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    var config = {};
    if (token) {
        config = {headers: {'x-access-token': token}}
    }
    return apiCall('get', CHECK_AUTH_URL, config)
        .then((response: AxiosResponse) => {
            if (response.status != 200) {
                throw Error(response.statusText)
            }
        })
};

export function logoutAction() {
    localStorage.removeItem('authToken');
    return (dispatch: ThunkDispatch<any, any, LogoutAction>) => {
        dispatch({type: LOGOUT_USER});
    };
};
