import { APP_CONSTANTS, LOADER_STATES, ALERT_STATES } from '../../_constants';

let defAppState = {
    loaderState: {},
    alertState: {},
};

export const AppControlState = (state = defAppState, action) => {
    let nState = { ...state };
    switch (action.type) {
        case APP_CONSTANTS.ALERT_SUCCESS:
            nState.alertState = {
                alert_type: ALERT_STATES.SUCCESS,
                alert_message: action.alert_message
            }
            return nState;
        case APP_CONSTANTS.ALERT_ERROR:
            nState.alertState = {
                alert_type: ALERT_STATES.ERROR,
                alert_message: action.alert_message
            }
            return nState;
        case APP_CONSTANTS.ALERT_CLEAR:
            nState.alertState = {};
            return nState;

        /** Loader **/
        case APP_CONSTANTS.HIDE_LOADER:
            nState.loaderState = {};
            return nState;
        case APP_CONSTANTS.SHOW_LOADER:
            nState.loaderState = {
                isLoading: LOADER_STATES.SHOW,
                isBlocking: action.payload.isBlocking
            }
            return nState;
        case APP_CONSTANTS.SHOW_LOADER_RETRY:
            nState.loaderState.isLoading = LOADER_STATES.RETRY;
            return nState;
        default:
            return nState;
    }
}
