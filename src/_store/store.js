import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './Reducers';
import { apiService } from '../_services/api.service';

export const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(
        thunkMiddleware.withExtraArgument(apiService),
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
);
