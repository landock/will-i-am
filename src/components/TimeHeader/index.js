import React, { Component } from 'react';
import moment from 'moment';

import timeView from '../../images/time.gif';
import timeViewDk from '../../images/time-dark.gif';

export default class TimeHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time: moment().format('h:mm A')
		}
	}

	componentDidMount() {
		var interval = setInterval(() => {
			this.setState({
				time: moment().format('h:mm A'),
				clearSetIntervalKey: interval,
			})
		}, 40000)
	}

	componentWillUnmount() {
		clearInterval(this.state.clearSetIntervalKey)
	}

	render() {
		const { isHomeDisplayed } = this.props;
		const themeClass = isHomeDisplayed ? 'light' : ' dark';
		return (
			<div className={themeClass}>
				<div className="time">
					<img className="t-light" alt="icon" src={timeView}/>
					<img className="t-dark" alt="icon" src={timeViewDk}/>
				</div>
				<span className="time-digit">{this.state.time}</span>
			</div>
		);
	}
}
