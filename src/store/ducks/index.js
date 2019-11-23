import {combineReducers} from 'redux';
import {Reducer as ratingBanks} from './ratingBanks';

const reducers = combineReducers({
  ratingBanks,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
