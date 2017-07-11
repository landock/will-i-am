import React from 'react';
import moment from 'moment';
import Isvg from 'react-inlinesvg';

import AppHeader from '../AppHeader';

import addIcon from '../../images/add.svg';
import listIcon from '../../images/format_list_bulleted.svg';
import searchIcon from '../../images/search.svg';

export default function Calendar({ events, closeApp }) {
  const markUp = events.map(event => (
    <div key={event.id}>
	    <h5>
		    <span>{event.start.momentDate.format('ddd MMM D')}</span>
	    </h5>
	    <div className="event-wrapper">
		    {event.start.date
			    ? (
				    <div className="all-day">all-day</div>
			    )
			    : (
				    <div className="event-time">
					    <p>{event.start.momentDate.format('h:mm A')}</p>
					    <p>{event.end.momentDate.format('h:mm A')}</p>
				    </div>
			    )
		    }
		    <div className="event-summary">
			    {event.summary}
		    </div>
	    </div>
    </div>
  ));

	const rightContent = (
		<div className="fake-menu">
			<Isvg src={listIcon}/>
			<Isvg src={searchIcon}/>
			<Isvg src={addIcon}/>
		</div>
	);

	const leftContent = (
		<div className="arrow">
			<i className="fa fa-angle-left" aria-hidden="true"/>
			<span className="calendar-header-month">{moment().format('MMMM')}</span>
		</div>
	);

  return (
	  <div className="Calendar">
		  <AppHeader
			  title="Will's calendar"
			  leftContent={leftContent}
			  rightContent={rightContent}
			  onHeaderClick={() => closeApp()}
		  />
		  <h5 style={{ color: 'red' }} className="today">
			  <span>{moment().format('ddd MMM DD')}</span>
		  </h5>
		  <div> {events ? markUp : ''} </div>
		  <div className="calendar-footer">
			  <p>Today</p>
			  <p>Calendars</p>
			  <p>Inbox</p>
		  </div>
	  </div>
  );
}
