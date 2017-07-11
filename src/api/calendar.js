import moment from 'moment';

const GOOGLE_API_KEY = 'AIzaSyAfy7djlPQFWfX4TqKttxtaZQD8AQBojH4';
const CALENDAR_ID = 'k27qtflciqu8m61qsiulro1mr0@group.calendar.google.com';
const getApiUrl = (calendarId, apiKey) => `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/?key=${apiKey}&singleEvents=true&orderBy=startTime`;

export function fetchEvents() {

	return fetch(getApiUrl(CALENDAR_ID, GOOGLE_API_KEY))
		.then(response => response.json())
		.then((json) => {
			const eventsWithGoodDateObjects = json && json.items.map((event) => {
				event.start.momentDate = event.start.dateTime
					? moment(event.start.dateTime, ['YYYY-MM-DD HH:mm'])
					: moment(event.start.date, ['YYYY-MM-DD'])
				;

				event.end.momentDate = event.end.dateTime
					? moment(event.end.dateTime, ['YYYY-MM-DD HH:mm'])
					: moment(event.end.date, ['YYYY-MM-DD']);

				return event
			});

			eventsWithGoodDateObjects.forEach(event => console.log(event));

			return eventsWithGoodDateObjects.filter(event => {
				let date = event.start.date || event.start.dateTime;
				return moment(date).isAfter(moment());
			})
		})
		.catch(err => console.log('error', err));
}
