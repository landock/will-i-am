import { MESSAGE_STATUS } from '../constants';
const API_ENDPOINT = `https://william-messages-staging.herokuapp.com/api/v1/news_posts?status=${MESSAGE_STATUS}`;

export function fetchNews() {
	return fetch(API_ENDPOINT)
		.then(response => response.json())
		.then(json => json).catch((err) => {
			console.log('error', err);
		});
}
