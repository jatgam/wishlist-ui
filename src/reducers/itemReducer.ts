import {ITEM_GET_WANTED_START, ITEM_GET_WANTED_SUCCESS, ITEM_GET_WANTED_FAIL,
    ItemGetWantedAction, ItemGetWantedSuccessAction, ItemGetWantedFailAction, WantedItems,
    ITEM_GET_RESERVED_FAIL, ITEM_GET_RESERVED_START, ITEM_GET_RESERVED_SUCCESS,
    ItemGetReservedAction, ItemGetReservedSuccessAction, ItemGetReservedFailAction, ReservedItems,
    ITEM_RESERVE_START, ITEM_RESERVE_SUCCESS, ITEM_RESERVE_FAIL, ITEM_UNRESERVE_START, ITEM_UNRESERVE_SUCCESS, ITEM_UNRESERVE_FAIL,
    ItemReserveAction, ItemUnReserveAction, ItemGenericResponse, ItemReserveFailAction, ItemUnReserveFailAction} from '../actions/itemAction';
import { AxiosResponse } from 'axios';

export interface ItemState {
    loading: boolean,
    wantedItems?: WantedItems[],
    reservedItems?: ReservedItems[],
    error?: AxiosResponse | Error,
}

const defaultState: ItemState = {
    loading: false,
    wantedItems: [],
    reservedItems: [],
    error: undefined
}

export default function reducer(state: ItemState = defaultState, action: ItemGetWantedAction | ItemGetReservedAction | ItemReserveAction | ItemUnReserveAction) {
    switch (action.type) {
        case ITEM_GET_WANTED_START:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case ITEM_GET_WANTED_SUCCESS:
            let successAction = action as ItemGetWantedSuccessAction;
            return {
                ...state,
                loading: false,
                wantedItems: successAction.payload.items
            };
        case ITEM_GET_WANTED_FAIL:
            let failAction = action as ItemGetWantedFailAction;
            return {
                ...state,
                loading: false,
                error: failAction.payload
            };
        case ITEM_GET_RESERVED_START:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case ITEM_GET_RESERVED_SUCCESS:
            let successGetReservedAction = action as ItemGetReservedSuccessAction;
            return {
                ...state,
                loading: false,
                reservedItems: successGetReservedAction.payload.items
            };
        case ITEM_GET_RESERVED_FAIL:
            let failGetReservedAction = action as ItemGetReservedFailAction;
            return {
                ...state,
                loading: false,
                error: failGetReservedAction.payload
            };
        case ITEM_RESERVE_START:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case ITEM_RESERVE_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case ITEM_RESERVE_FAIL:
            let failReserveAction = action as ItemReserveFailAction;
            return {
                ...state,
                loading: false,
                error: failReserveAction.payload
            };
        case ITEM_UNRESERVE_START:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case ITEM_UNRESERVE_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case ITEM_UNRESERVE_FAIL:
            let failUnReserveAction = action as ItemUnReserveFailAction;
            return {
                ...state,
                loading: false,
                error: failUnReserveAction.payload
            };
        default:
            return state;
    }
}
