import {combineReducers} from 'redux';
import {Reducer as ratingBanks} from './ratingBanks';

const reducers = combineReducers({
  ratingBanks,
});

export default reducers;
