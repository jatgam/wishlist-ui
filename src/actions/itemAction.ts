import {ThunkDispatch} from 'redux-thunk';
import {AxiosResponse, AxiosError} from 'axios';
import formurlencoded from 'form-urlencoded';
import {push} from 'connected-react-router';

import apiCall, {Post} from '../util/apiFactory';

const ITEM_GETWANTED_URL = '/api/item';
const ITEM_GETRESERVED_URL = '/api/item/reserved';
const ITEM_RESERVE_URL = '/api/item/id/:itemid/reserve';
const ITEM_UNRESERVE_URL = '/api/item/id/:itemid/unreserve';

export const ITEM_GET_WANTED_START = 'item/GET_WANTED_START';
export const ITEM_GET_WANTED_SUCCESS = 'item/GET_WANTED_SUCCESS';
export const ITEM_GET_WANTED_FAIL = 'item/GET_WANTED_FAIL';

export const ITEM_GET_RESERVED_START = 'item/GET_RESERVED_START';
export const ITEM_GET_RESERVED_SUCCESS = 'item/GET_RESERVED_SUCCESS';
export const ITEM_GET_RESERVED_FAIL = 'item/GET_RESERVED_FAIL';

export const ITEM_RESERVE_START = 'item/RESERVE_START';
export const ITEM_RESERVE_SUCCESS = 'item/RESERVE_SUCCESS';
export const ITEM_RESERVE_FAIL = 'item/RESERVE_FAIL';

export const ITEM_UNRESERVE_START = 'item/UNRESERVE_START';
export const ITEM_UNRESERVE_SUCCESS = 'item/UNRESERVE_SUCCESS';
export const ITEM_UNRESERVE_FAIL = 'item/UNRESERVE_FAIL';

export interface ItemResponse<T> {
    code: number,
    message: string,
    items: T[]
}

export interface ItemGenericResponse {
    code: number,
    message: string
}

export interface WantedItems {
    id: number,
    name: string,
    url: string,
    reserved: boolean,
    rank: number,
    createdAt: string,
    updatedAt: string
}

export interface ReservedItems {
    id: number,
    name: string,
    url: string,
    reserved: boolean,
    rank: number,
    createdAt: string,
    updatedAt: string
}

export type ItemGetWantedStartAction = {type: string};
export type ItemGetWantedSuccessAction = {type: string, payload: ItemResponse<WantedItems>};
export type ItemGetWantedFailAction = {type: string, payload: AxiosResponse | Error};
export type ItemGetWantedAction = ItemGetWantedStartAction | ItemGetWantedSuccessAction | ItemGetWantedFailAction;

export type ItemGetReservedStartAction = {type: string};
export type ItemGetReservedSuccessAction = {type: string, payload: ItemResponse<ReservedItems>};
export type ItemGetReservedFailAction = {type: string, payload: AxiosResponse | Error};
export type ItemGetReservedAction = ItemGetReservedStartAction | ItemGetReservedSuccessAction | ItemGetReservedFailAction;

export type ItemReserveStartAction = {type: string};
export type ItemReserveSuccessAction = {type: string};
export type ItemReserveFailAction = {type: string, payload: AxiosResponse | Error};
export type ItemReserveAction = ItemReserveStartAction | ItemReserveSuccessAction | ItemReserveFailAction;

export type ItemUnReserveStartAction = {type: string};
export type ItemUnReserveSuccessAction = {type: string};
export type ItemUnReserveFailAction = {type: string, payload: AxiosResponse | Error};
export type ItemUnReserveAction = ItemUnReserveStartAction | ItemUnReserveSuccessAction | ItemUnReserveFailAction;

export const getWantedItemsAction = () => {
    return (dispatch: ThunkDispatch<any, any, ItemGetWantedAction>) => {
        dispatch({type: ITEM_GET_WANTED_START});
        return apiCall('get', ITEM_GETWANTED_URL).then((response: AxiosResponse<ItemResponse<WantedItems>>) => {
            if (response.status === 200) {
                dispatch({type: ITEM_GET_WANTED_SUCCESS, payload: response.data});
            } else {
                throw Error(`getWantedItemsAction: get items failed, response code: ${response.status}`);
            }
        }).catch((err: AxiosError) => dispatch({type: ITEM_GET_WANTED_FAIL, payload: {error: err.response}}))
        .catch((err: Error) => dispatch({type: ITEM_GET_WANTED_FAIL, payload: err}));
    };
};

export const getReservedItemsAction = () => {
    return (dispatch: ThunkDispatch<any, any, ItemGetReservedAction>) => {
        dispatch({type: ITEM_GET_RESERVED_START});
        const token = localStorage.getItem('authToken');
        let config = {};
        if (token) {
            config = {headers: {'Authorization': 'Bearer '+token}}
        }
        return apiCall('get', ITEM_GETRESERVED_URL, config).then((response: AxiosResponse<ItemResponse<ReservedItems>>) => {
            if (response.status === 200) {
                dispatch({type: ITEM_GET_RESERVED_SUCCESS, payload: response.data});
            } else {
                throw Error(`getReservedItemsAction: get items failed, response code: ${response.status}`);
            }
        }).catch((err: AxiosError) => dispatch({type: ITEM_GET_RESERVED_FAIL, payload: {error: err.response}}))
        .catch((err: Error) => dispatch({type: ITEM_GET_RESERVED_FAIL, payload: err}));
    };
};

export const reserveItemAction = (itemid: string) => {
    return (dispatch: ThunkDispatch<any, any, ItemReserveAction>) => {
        dispatch({type: ITEM_RESERVE_START});
        const token = localStorage.getItem('authToken');
        let config = {};
        if (token) {
            config = {headers: {'Authorization': 'Bearer '+token}}
        }
        return apiCall('post', ITEM_RESERVE_URL.replace(':itemid', itemid), config).then((response: AxiosResponse<ItemGenericResponse>) => {
            if (response.status === 200) {
                dispatch({type: ITEM_RESERVE_SUCCESS});
                dispatch(getWantedItemsAction());
                dispatch(getReservedItemsAction());
            } else {
                throw Error(`reserveItemAction: failed to reserve item, response code: ${response.status}`);
            }
        }).catch((err: AxiosError) => dispatch({type: ITEM_RESERVE_FAIL, payload: {error: err.response}}))
        .catch((err: Error) => dispatch({type: ITEM_RESERVE_FAIL, payload: err}));
    };
};

export const unReserveItemAction = (itemid: string) => {
    return (dispatch: ThunkDispatch<any, any, ItemUnReserveAction>) => {
        dispatch({type: ITEM_UNRESERVE_START});
        const token = localStorage.getItem('authToken');
        let config = {};
        if (token) {
            config = {headers: {'Authorization': 'Bearer '+token}}
        }
        return apiCall('post', ITEM_UNRESERVE_URL.replace(':itemid', itemid), config).then((response: AxiosResponse<ItemGenericResponse>) => {
            if (response.status === 200) {
                dispatch({type: ITEM_UNRESERVE_SUCCESS});
                dispatch(getWantedItemsAction());
                dispatch(getReservedItemsAction());
            } else {
                throw Error(`unReserveItemAction: failed to un-reserve item, response code: ${response.status}`);
            }
        }).catch((err: AxiosError) => dispatch({type: ITEM_UNRESERVE_FAIL, payload: {error: err.response}}))
        .catch((err: Error) => dispatch({type: ITEM_UNRESERVE_FAIL, payload: err}));
    };
};
