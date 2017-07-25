import { MESSAGE_STATUS } from '../constants';

const API_ENDPOINT = `https://william-messages-staging.herokuapp.com/api/v1/conversations?status=${MESSAGE_STATUS}`;

export function fetchMessages() {
  return fetch(API_ENDPOINT)
      .then(response => response.json())
      .then(json => json).catch((err) => {
        console.log('error');
        console.log(err);
      });
}
