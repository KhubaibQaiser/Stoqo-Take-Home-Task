import { API_CALLS, PAGE_SET, ERROR_CODES } from '../../_constants';
import { ApiActions, AlertActions } from '../';
import { appController } from '../../_helpers';
import { StoreActions } from './store.actions';

export const UserActions = {
    login,
    logout,
    signup
};

function login(dto) {
    return (dispatch) => {
        if (!dto.username) dispatch(AlertActions.error(ERROR_CODES.LOGIN_EMAIL_REQUIRED));
        else if (!dto.password) dispatch(AlertActions.error(ERROR_CODES.LOGIN_PASSWORD_REQUIRED));
        else {
            dispatch(ApiActions.execRequest(API_CALLS.Login, dto, (response) => {
                let { username, password } = dto;
                if (response.token) {
                    appController.updateUserData({ username, password, token: response.token });
                    appController.pageSwitch(PAGE_SET.STORES);
                }
                else {
                    appController.updateUserData({ token: "" });
                    dispatch(AlertActions.error(ERROR_CODES.INVALID_LOGIN));
                }
            }));
        }
    }
}

function logout() {
    return (dispatch) => {
        // For now, clear the local token only since the logout API is missing
        appController.updateUserData({ token: "" });
        appController.pageSwitch(PAGE_SET.LOGIN, { direction: "rtl" });
        dispatch(StoreActions.clearAll());
    }
}

function signup(dto) {
    return (dispatch) => {
        if (!dto.username) dispatch(AlertActions.error(ERROR_CODES.LOGIN_EMAIL_REQUIRED));
        else if (!dto.password) dispatch(AlertActions.error(ERROR_CODES.LOGIN_PASSWORD_REQUIRED));
        else {
            dispatch(ApiActions.execRequest(API_CALLS.Signup, dto, (response) => {
                if (response.username) {
                    appController.updateUserData({ username: response.username, password: dto.password, token: response.password });
                    dispatch(login(dto));
                }
                else {
                    dispatch(AlertActions.error(ERROR_CODES.USER_EXISTS));
                }
            }));
        }
    }
}