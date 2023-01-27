//modules/index.js

import { combineReducers } from 'redux';
import counter from './counter';
import sample from './smaple';

const rootReducer = combineReducers({
    counter,
    sample
});

export default rootReducer;