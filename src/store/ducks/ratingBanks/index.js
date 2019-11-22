import {createActions, createReducer} from 'reduxsauce';

const INITIAL_STATE = {
  pending: false,
  pendingCount: 0,
  banks: [],
};

const accountBank = {
  accountBank: payload => ({
    type: 'ACCOUNT_BANK',
    payload,
    track: 'account_bank',
  }),
  accountBankSuccess: payload => ({
    type: 'ACCOUNT_BANK_SUCCESS',
    payload,
    track: 'account_bank_success',
  }),
  accountBankError: payload => ({
    type: 'ACCOUNT_BANK_ERROR',
    payload,
    track: 'account_bank_error',
  }),
  accountBankPending: () => ({
    type: 'ACCOUNT_BANK_PENDING',
    track: 'account_bank_pending',
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
  isVisibleError: true,
  errorMessage: payload,
});

export const {Types, Creators: Actions} = createActions({
  ...accountBank,
});

export const HANDLERS = {
  [Types.ACCOUNT_BANK]: request,
  [Types.ACCOUNT_BANK_PENDING]: requestPending,
  [Types.ACCOUNT_BANK_ERROR]: requestError,
  [Types.ACCOUNT_BANK_SUCCESS]: requestSuccess,
};

export const Reducer = createReducer(INITIAL_STATE, HANDLERS);
