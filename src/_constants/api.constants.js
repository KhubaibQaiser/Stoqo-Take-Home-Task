export const asyncActionType = (_URL, _IsGet = true, _IsAuth = false, _IsBlocking = true) => {
  return {
    URL: _URL,
    IsGet: _IsGet,
    IsAuth: _IsAuth,
    IsBlocking: _IsBlocking,
    PENDING: `${_URL}_PENDING`,
    SUCCESS: `${_URL}_SUCCESS`,
    FAILURE: `${_URL}_FAILURE`
  }
};

export const API_MODES = {
  EXECUTE: "Execute",
  PENDING: "Pending",
  SUCCESS: "Success",
  FAILURE: "Failure"
}


export const API_CALLS = {
  Signup: asyncActionType("signup/", false),
  Login: asyncActionType("login/", false),
  Logout: asyncActionType("logout/", false),
  GetStores: asyncActionType("stores/", true, true),
  GetStoresInfo: asyncActionType("stores/id", true, true, false),
}