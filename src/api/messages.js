const API_ENDPOINT = 'https://william-messages-herokuapp-com.global.ssl.fastly.net/api/v1/conversations';

export function fetchMessages() {
  return fetch(API_ENDPOINT)
      .then(response => response.json())
      .then(json => json).catch((err) => {
        console.log('error');
        console.log(err);
      });
}
