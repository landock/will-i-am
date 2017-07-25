import React, { Component } from 'react';
import { Timeline } from 'react-twitter-widgets';

import AppFrame from '../AppFrame';

export default class Twitter extends Component {
	render() {
		const dataSource = {
			sourceType: 'profile',
			screenName: 'iamwill',
		};

		const options = {
			chrome: 'nofooter',
			height: 695,
		};

		return (
			<AppFrame
				appClassName="Twitter"
				title="Twitter"
				onHeaderClick={this.props.onHeaderClick}
			>
				<Timeline dataSource={dataSource} options={options} style={{minHeight: '650px'}}/>
			</AppFrame>
		);
	}
}
