import { combineReducers } from 'redux';
import { AppControlState } from './app.control.reducer';
import { StoreState } from './store.reducer';

const rootReducer = combineReducers({
    AppControlState,
    StoreState
});

export default rootReducer;
