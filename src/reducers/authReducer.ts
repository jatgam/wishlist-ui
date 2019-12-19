import {LOGIN_START, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_USER, LogoutAction, LoginAction, LoginFailAction, LoginSuccessAction,
    PW_RESET_START, PW_RESET_SUCCESS, PW_RESET_FAIL, PasswordResetAction, PasswordResetFailAction,
    PW_FORGOT_START, PW_FORGOT_SUCCESS, PW_FORGOT_FAIL, PasswordForgotAction, PasswordForgotFailAction } from '../actions/authAction';
import jwtDecode from 'jwt-decode'

export interface AuthState {
    loading: boolean,
    user?: unknown | null,
    error?: Error,
}

const defaultState: AuthState = (token => ({
    loading: false,
    user: token ? jwtDecode(token) : null,
    error: undefined,
}))(localStorage.getItem('authToken'))

export default function reducer(state: AuthState = defaultState, action: LoginAction | LogoutAction | PasswordForgotAction | PasswordResetAction) {
    switch (action.type) {
        case LOGIN_START:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case LOGIN_SUCCESS:
            let successAction = action as LoginSuccessAction;
            return {
                ...state,
                loading: false,
                user: successAction.payload
            };
        case LOGIN_FAIL:
            let failAction = action as LoginFailAction;
            return {
                ...state,
                loading: false,
                error: failAction.payload
            };
        case LOGOUT_USER:
            return {
                ...state,
                loading: false,
                user: null
            };
        case PW_RESET_START:
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        case PW_RESET_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case PW_RESET_FAIL:
            let pwResetfailAction = action as PasswordResetFailAction;
            return {
                ...state,
                loading: false,
                error: pwResetfailAction.payload,
            };
        case PW_FORGOT_START:
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        case PW_FORGOT_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case PW_FORGOT_FAIL:
            let pwForgotfailAction = action as PasswordForgotFailAction;
            return {
                ...state,
                loading: false,
                error: pwForgotfailAction.payload,
            };
        default:
            return state;
    }
}
