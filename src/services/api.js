import axios from 'axios';
import {getUniqueId} from 'react-native-device-info';

const GET = 'get';
const POST = 'post';
const PUT = 'put';
const DELETE = 'delete';

export default class Service {
  constructor({baseURL, headers}) {
    this.baseURL = baseURL;
    this.requestHeaders = headers;
  }

  post = (data, body = {}) => this.request({...data, method: POST, body});

  put = (data, body = {}) => this.request({...data, method: PUT, body});

  get = (data, params = {}) => this.request({...data, method: GET, params});

  delete = (data, params = {}) =>
    this.request({...data, method: DELETE, params});

  request = async ({body, url, params, method}) => {
    let options = {
      url: this.baseURL + url,
      headers: {...this.requestHeaders, uniqueId: getUniqueId()},
      method,
      params,
    };

    options = await this.setBody(method, body, options);
    console.log(options);

    try {
      const response = await axios(options);
      console.log(response);
      return response.data.data ? response.data.data : response.data;
    } catch (err) {
      let message;
      console.log(err);
      message = err.response.data.message || err;
      throw new Error(message);
    }
  };

  setBody = async (method, data, options) => {
    if (method !== GET && method !== DELETE) {
      options = {...options, data};
    }
    return options;
  };
}
