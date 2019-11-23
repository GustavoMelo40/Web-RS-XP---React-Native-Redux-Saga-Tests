import {createActions, createReducer} from 'reduxsauce';

const INITIAL_STATE = {
  pending: false,
  pendingCount: 0,
  banks: [],
  errorMessage: '',
};

const ratingBank = {
  ratingBank: () => ({
    type: 'RATING_BANK',
  }),
  ratingBankSuccess: payload => ({
    type: 'RATING_BANK_SUCCESS',
    payload,
  }),
  ratingBankError: payload => ({
    type: 'RATING_BANK_ERROR',
    payload,
  }),
  ratingBankPending: () => ({
    type: 'RATING_BANK_PENDING',
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
  ...ratingBank,
});

export const HANDLERS = {
  [Types.RATING_BANK]: request,
  [Types.RATING_BANK_PENDING]: requestPending,
  [Types.RATING_BANK_ERROR]: requestError,
  [Types.RATING_BANK_SUCCESS]: requestSuccess,
};

export const Reducer = createReducer(INITIAL_STATE, HANDLERS);
