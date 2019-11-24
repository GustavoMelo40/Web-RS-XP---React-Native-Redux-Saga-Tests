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
          id: '1',
          code: '655',
          name: 'Neon Pagamentos',
          icon: 'https://i.ibb.co/wRc4Rs0/neon-3x.png',
          generalRating: '5',
          myRating: '5',
        },
        {
          id: '2',
          code: '213',
          name: 'Banco vestido ',
          icon: 'https://i.ibb.co/rkftVPW/vestido-3x.png',
          generalRating: '3',
          myRating: '3',
        },
        {
          id: '3',
          code: '122',
          name: 'D7',
          icon: 'https://i.ibb.co/JpkpNCw/d7-3x.png',
          generalRating: '2',
          myRating: '3',
        },
        {
          id: '4',
          code: '123',
          name: 'Banco grêmio',
          icon: 'https://i.ibb.co/q1jPg5w/gremio-3x.png',
          generalRating: '2',
          myRating: '2',
        },
        {
          id: '5',
          code: '425',
          name: 'Box Bank',
          icon: 'https://i.ibb.co/Ssrkpxr/box-3x.png',
          generalRating: '2',
          myRating: '1',
        },
        {
          id: '6',
          code: '345',
          name: 'Lento Bank',
          icon: 'https://i.ibb.co/bzmY7yR/lento-3x.png',
          generalRating: '5',
          myRating: '3',
        },
        {
          id: '7',
          code: '245',
          name: 'Banco Uati ',
          icon: 'https://i.ibb.co/wYVwg12/uati-3x.png',
          generalRating: '3',
          myRating: '2',
        },
        {
          id: '8',
          code: '674',
          name: 'Previous',
          icon: 'https://i.ibb.co/wRTqckX/previous-3x.png',
          generalRating: '2',
          myRating: '1',
        },
        {
          id: '9',
          code: '477',
          name: 'Recebe!',
          icon: 'https://i.ibb.co/52CPfzj/recebe-3x.png',
          generalRating: '2',
          myRating: '3',
        },
        {
          id: '10',
          code: '345',
          name: 'Banco Pirata',
          icon: 'https://i.ibb.co/BjPppWW/pirata-3x.png',
          generalRating: '2',
          myRating: '2',
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
