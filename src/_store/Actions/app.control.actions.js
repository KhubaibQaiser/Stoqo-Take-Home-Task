import { APP_CONSTANTS, LOADER_STATES } from '../../_constants';

/** Alert Actions **/
export const AlertActions = {
    isVisible: false,
    success: function (alert_message) {
        AlertActions.isVisible = true;
        return (dispatch) => {
            dispatch({ type: APP_CONSTANTS.ALERT_SUCCESS, alert_message });
        }
    },
    error: function (alert_message) { 
        AlertActions.isVisible = true;
        return (dispatch) => {
            dispatch({ type: APP_CONSTANTS.ALERT_ERROR, alert_message }); 
        }
    },
    clear: function () {
        return (dispatch) => {
            if (!AlertActions.isVisible)
                return;
            AlertActions.isVisible = false;
            dispatch({ type: APP_CONSTANTS.ALERT_CLEAR }); 
        }
    }
};

/** Loader Actions **/
export const LoaderAction = {
    isLoading: LOADER_STATES.HIDE,
    Show: function (isBlocking) { 
        LoaderAction.isLoading = LOADER_STATES.SHOW;
        return (dispatch) =>{
            dispatch({ type: APP_CONSTANTS.SHOW_LOADER, payload: { isBlocking } }); 
        };
    },
    ShowWithRetryMessage: function () { 
        LoaderAction.isLoading = LOADER_STATES.RETRY;
        return (dispatch) => {
            dispatch({ type: APP_CONSTANTS.SHOW_LOADER_RETRY }); 
        };
    },
    Hide: function () { 
        LoaderAction.isLoading = LOADER_STATES.HIDE;
        return (dispatch) => {
            dispatch({ type: APP_CONSTANTS.HIDE_LOADER }); 
        };
    }
}
