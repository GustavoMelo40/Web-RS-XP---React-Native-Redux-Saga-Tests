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
  rate = (body: Rate) => this.post(config.rate, body);
}

export default new BankService();
