import AsyncStorage from '@react-native-community/async-storage';
import configureStore from 'redux-mock-store';
import {expectSaga} from 'redux-saga-test-plan';
import BankService from '~/services/bank';
import {Actions, Types} from '~/store/ducks/ratingBanks';
import {watchBanksRated, watchRateBank} from '~/store/sagas';

import {call, fork, put, takeLatest, select, all} from 'redux-saga/effects';

const middlewares = [];
const mockStore = configureStore(middlewares);
const addTodo = () => ({type: 'ADD_TODO'});

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

describe('Saga tests BankService', () => {
  beforeAll(async () => {
    await AsyncStorage.setItem('@Global:idDevice', '489648948948989489489');
  });

  it('testing a banks', () => {
    let data = {};

    const payload = {
      banks: [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          code: '655',
          name: 'Neon Pagamentos',
          icon:
            'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/rocketseat_logo.png',
          generalRating: '5',
          myRating: '5',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          code: '358',
          name: 'Nu Bank',
          icon:
            'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/rocketseat_logo.png',
          generalRating: '3',
          myRating: '2',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          code: '134',
          name: 'Banco Brasil',
          icon:
            'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/rocketseat_logo.png',
          generalRating: '2',
          myRating: '1',
        },
      ],
    };

    return expectSaga(watchBanksRated)
      .provide([[call(BankService.banks), payload]])
      .put(banksRatedSuccess(payload))
      .dispatch(banksRated())
      .silentRun();
  });

  it('testing a rate bank', () => {
    let data = {
      id: '498489498498498498498498489',
      rate: '5',
    };

    const payload = {};

    return expectSaga(watchRateBank)
      .provide([[call(BankService.rate, data), payload]])
      .put(rateBankSuccess())
      .dispatch(rateBank(data))
      .silentRun();
  });
});

describe('Saga tests mock', () => {
  beforeAll(async () => {
    await AsyncStorage.setItem('@Global:idDevice', '489648948948989489489');
  });

  it('testing a mock store', () => {
    // Initialize mockstore with empty state
    const initialState = {};
    const store = mockStore(initialState);

    // Dispatch the action
    store.dispatch(addTodo());

    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = {type: 'ADD_TODO'};
    expect(actions).toEqual([expectedPayload]);
  });
});
