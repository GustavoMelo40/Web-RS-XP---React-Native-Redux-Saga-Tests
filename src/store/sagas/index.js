import {call, fork, put, takeLatest, select, all} from 'redux-saga/effects';

import {Actions, Types} from '~/store/ducks/ratingBanks';

import BankService from '~/services/bank';

const {
  ratingBank,
  ratingBankPending,
  ratingBankSuccess,
  ratingBankError,
} = Actions;

function* ratingBankRequest() {
  try {
    yield put(ratingBankPending());
    const data = yield call(BankService.bank);
    yield put(ratingBankSuccess(data));
  } catch (e) {
    yield put(ratingBankError(e.message));
  }
}

function* watchRatingBank() {
  yield takeLatest(Types.RATING_BANK, ratingBankRequest);
}

export default function* root() {
  yield fork(watchRatingBank);
}
