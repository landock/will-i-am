import React from 'react';
import moment from 'moment';

export default function CalendarIcon({ handleClick }) {
	return (
		<div className="CalendarIcon">
			<button className="calendar-btn" tabIndex={0} onClick={() => handleClick()} id="calendar">
				<p style={{ color: 'red', fontSize: '60%', margin: '0' }}>{moment().format('dddd')}</p>
				<p style={{ fontSize: '200%', fontWeight: '100', margin: '0' }}>{moment().format('DD')}</p>
			</button>
			<p style={{ color: '#aaa', fontSize: '70%', margin: '3px 0 0 0', textAlign: 'center' }}>Calendar</p>
		</div>
	);
}
