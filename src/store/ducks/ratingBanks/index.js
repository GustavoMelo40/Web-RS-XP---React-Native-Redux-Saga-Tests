import {createActions, createReducer} from 'reduxsauce';

const INITIAL_STATE = {
  pending: false,
  pendingCount: 0,
  banks: [],
  errorMessage: '',
};

const banksRated = {
  banksRated: () => ({
    type: 'BANKS_RATED',
  }),
  banksRatedSuccess: payload => ({
    type: 'BANKS_RATED_SUCCESS',
    payload,
  }),
  banksRatedError: payload => ({
    type: 'BANKS_RATED_ERROR',
    payload,
  }),
  banksRatedPending: () => ({
    type: 'BANKS_RATED_PENDING',
  }),
};

const request = state => ({
  ...state,
});

const requestPending = state => ({
  ...state,
  pending: state.pendingCount++ ? true : true,
});

const requestSuccess = (state, {payload}) => ({
  ...state,
  ...payload,
  pending: state.pendingCount-- && state.pendingCount === 0 ? false : true,
});

const requestError = (state, {payload}) => ({
  ...state,
  pending: state.pendingCount-- && state.pendingCount === 0 ? false : true,
  errorMessage: payload,
});

export const {Types, Creators: Actions} = createActions({
  ...banksRated,
});

export const HANDLERS = {
  [Types.BANKS_RATED]: request,
  [Types.BANKS_RATED_PENDING]: requestPending,
  [Types.BANKS_RATED_ERROR]: requestError,
  [Types.BANKS_RATED_SUCCESS]: requestSuccess,
};

export const Reducer = createReducer(INITIAL_STATE, HANDLERS);
