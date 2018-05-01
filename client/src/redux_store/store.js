import {createStore, combineReducers, compose} from "redux";
import reducers from '../reducers/reducers';
import {persistStore, autoRehydrate} from 'redux-persist';

let store = compose(autoRehydrate())(createStore)(combineReducers({reducers}));
persistStore(store);

export default store;
