import {call, fork, put, takeLatest, select, all} from 'redux-saga/effects';

import {Actions, Types} from '~/store/ducks/ratingBanks';

import BankService from '~/services/bank';

const {
  banksRated,
  banksRatedPending,
  banksRatedSuccess,
  banksRatedError,
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

export function* watchBanksRated() {
  yield takeLatest(Types.BANKS_RATED, banksRatedRequest);
}

export default function* root() {
  yield fork(watchBanksRated);
}
