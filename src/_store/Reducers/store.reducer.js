import { API_CALLS, STORE_CONSTANTS } from '../../_constants';

let defaultState = {
    allStores: {
        curPage: 1,
        curFilter: "all",
        list: null
    },
    storeInfo: {}
}

export const StoreState = (state = defaultState, action) => {
    let nState = { ...state };
    switch (action.type) {
        case API_CALLS.GetStores.SUCCESS:
            nState.allStores.list = { ...action.payload };
            return nState;
        case STORE_CONSTANTS.JUMP_TO_PAGE:
            nState.allStores.curPage = action.payload;
            return nState;
        case STORE_CONSTANTS.APPLY_FILTER:
            nState.allStores.curFilter = action.payload;
            return nState;
        case STORE_CONSTANTS.CLEAR_STORE_INFO:
            nState.storeInfo = {};
            return nState;
        case API_CALLS.GetStoresInfo.SUCCESS:
            nState.storeInfo = { ...action.payload };
            return nState;
        case API_CALLS.GetStoresInfo.FAILURE:
            nState.storeInfo = { id: -1 };
            return nState;
        case STORE_CONSTANTS.CLEAR_ALL:
            return {
                allStores: {
                    curPage: 1,
                    curFilter: "all",
                    list: null
                },
                storeInfo: {}
            };
        default:
            return nState;
    }
}