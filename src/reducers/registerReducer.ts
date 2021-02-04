import {REGISTER_FAIL, REGISTER_START, REGISTER_SUCCESS, RegisterAction, RegisterFailAction} from '../actions/registerAction';

export interface RegisterState {
    loading: boolean,
    error?: Error,
}

const defaultState: RegisterState = {
    loading: false,
    error: undefined,
};

export default function reducer(state: RegisterState = defaultState, action: RegisterAction) {
    switch (action.type) {
        case REGISTER_START:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined
            };
        case REGISTER_FAIL: {
            const failAction = action as RegisterFailAction;
            return {
                ...state,
                loading: false,
                error: failAction.payload
            };
        }
        default:
            return state;
    }
}
