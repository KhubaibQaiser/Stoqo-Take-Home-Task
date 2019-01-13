import { API_CALLS, STORE_CONSTANTS } from '../../_constants';
import { ApiActions, LoaderAction } from '../';

export const StoreActions = {
    getStores,
    jumpToPage,
    getStoreInfo,
    clearStoreInfo,
    applyFilter,
    clearAll
};

function getStores(dto) {
    return (dispatch) => {
        dispatch(ApiActions.execRequest(API_CALLS.GetStores, dto, (response) => {
            if (response.results) {
                dispatch(jumpToPage(dto.page));
            }
            else {

            }
        }));
    }
};

function jumpToPage(index) {
    return (dispatch) => {
        dispatch({ type: STORE_CONSTANTS.JUMP_TO_PAGE, payload: index });
    }
}

function getStoreInfo(dto) {
    return (dispatch) => {
        const urlAction = {
            ...API_CALLS.GetStoresInfo,
            URL: API_CALLS.GetStoresInfo.URL.replace("id", dto.id)
        }
        dispatch(ApiActions.execRequest(urlAction, {}, (response) => {
            if (response.name && response.description) {

            }
            else {
                dispatch(LoaderAction.Hide());
            }
        }));
    }
}

function clearStoreInfo() {
    return (dispatch) => {
        dispatch({ type: STORE_CONSTANTS.CLEAR_STORE_INFO });
    }
}

function applyFilter(type) {
    return (dispatch) => {
        dispatch({ type: STORE_CONSTANTS.APPLY_FILTER, payload: type });
    }
}

function clearAll() {
    return (dispatch) => {
        dispatch({ type: STORE_CONSTANTS.CLEAR_ALL });
    }
}