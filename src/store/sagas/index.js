import {call, fork, put, takeLatest, select, all} from 'redux-saga/effects';

import {Actions, Types} from '~/store/ducks/ratingBanks';

import BankService from '~/services/bank';

const {
  banksRated,
  banksRatedPending,
  banksRatedSuccess,
  banksRatedError,

  rateBank,
  rateBankPending,
  rateBankSuccess,
  rateBankError,
} = Actions;

function* banksRatedRequest() {
  try {
    yield put(banksRatedPending());
    const data = yield call(BankService.banks);
    yield put(banksRatedSuccess(data));
  } catch (e) {
    yield put(banksRatedError(e.message));
  }
}

function* rateBankRequest({payload}) {
  try {
    yield put(rateBankPending());
    yield call(BankService.rate, payload);
    yield put(banksRated());
    yield put(rateBankSuccess());
  } catch (e) {
    yield put(rateBankError(e.message));
  }
}

function* watchBanksRated() {
  yield takeLatest(Types.BANKS_RATED, banksRatedRequest);
}

function* watchRateBank() {
  yield takeLatest(Types.RATE_BANK, rateBankRequest);
}

export default function* root() {
  yield fork(watchBanksRated);
  yield fork(watchRateBank);
}
