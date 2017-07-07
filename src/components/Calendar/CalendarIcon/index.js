import React from 'react';
import moment from 'moment';

export default function CalendarIcon({ handleClick }) {
	return (
		<div className="CalendarIcon">
			<button className="calendar-btn" tabIndex={0} onClick={() => handleClick()} id="calendar">
				<div className="day-word"><span>{moment().format('dddd')}</span></div>
				<div className="day-digits">{moment().format('D')}</div>
			</button>
			<p>Calendar</p>
		</div>
	);
}
