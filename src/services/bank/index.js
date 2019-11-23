// @flow

import Service from '~/services/api';
import {config} from './constants';
import {apiConfig} from '~/services/config';

import {Rating} from './interface';

class BankService extends Service {
  constructor() {
    super(apiConfig);
  }

  bank = () => this.get(config.bank);
}

export default new BankService();
