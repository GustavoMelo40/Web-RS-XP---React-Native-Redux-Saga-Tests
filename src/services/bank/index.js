// @flow

import Service from '~/services/api';
import {config} from './constants';
import {apiConfig} from '~/services/config';

import {Rate} from './interface';

class BankService extends Service {
  constructor() {
    super(apiConfig);
  }

  banks = () => this.get(config.banks);
}

export default new BankService();
