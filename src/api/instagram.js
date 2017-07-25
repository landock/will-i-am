const API_ENDPOINT = 'https://iamplus-service-cache-herokuapp-com.global.ssl.fastly.net/instagram/users/iamwill/media';

export function fetchInstagram() {
    return fetch(API_ENDPOINT)
	    .then(response => response.json())
	    .then(json => json)
	    .catch(err => console.log('error', err))
};
