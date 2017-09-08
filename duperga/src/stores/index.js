import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import ItemsReducer from '../reducers/ItemsReducer'

const middleware = applyMiddleware(logger, thunk);
const store = createStore(ItemsReducer, middleware)

export default store