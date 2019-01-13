import { LoaderAction, UserActions } from '../';

let curReq = [];

const execRequest = (urlAction, data, callback, AppExtraParams = {}) => {
  return (dispatch, getState, api) => {
    curReq = [urlAction, data, callback];
    dispatch(LoaderAction.Show(urlAction.IsBlocking));
    return api.exec(urlAction.URL, data, urlAction.IsGet, urlAction.IsAuth, AppExtraParams.isParallelRequestAllowed).then((response) => {

      if (response.data && typeof response.data === "string")
        response.data = JSON.parse(response.data);

      dispatch({ type: urlAction.SUCCESS, payload: response.data });
      dispatch(LoaderAction.Hide());
      if (typeof callback === "function")
        callback(response.data);
    })
      .catch((error) => {
        if (error.message === -100)
          return; // cancelled

        if (error.response && error.response.status === 401) {
          // Auth failed
          dispatch(UserActions.logout());
        }
        else if (error.response && error.response.status === 400) {
          // temporary error checking. api must return some kind of error code if data is not found.
          dispatch({ type: urlAction.FAILURE, payload: error });
          dispatch(LoaderAction.Hide());
        }
        else {
          dispatch({ type: urlAction.FAILURE, payload: error });
          dispatch(LoaderAction.ShowWithRetryMessage());
        }

        if (typeof callback === "function")
          callback(error);
      });
  }
};

const retry = () => {
  return (dispatch, getState, api) => {
    return dispatch(ApiActions.execRequest(curReq[0], curReq[1], curReq[2]));
  };
}

const cancel = () => {
  return (dispatch, getState, api) => {
    api.cancel();
    dispatch(LoaderAction.Hide());
  };
}

export const ApiActions = {
  execRequest,
  retry,
  cancel
};
