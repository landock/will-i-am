import React, { Component } from 'react';

import AppHeader from '../AppHeader';
import ee from '../../EventEmitter'

export default class AppFrame extends Component {
	constructor(props) {
		super(props);
		const { title, appClassName } = props;

		if(!title && !appClassName) return;

		this.ee = ee;

		this.handleClick = this.handleClick.bind(this);

		this.state = {
			isOpen: false,
		};
	}

	handleClick() {
		this.ee.emit('goHome');
	}

	render() {
		const { children, title, onTitleClick, appClassName, centerImageSrc, rightImageSrc } = this.props;

		let appHeaderProps = {
			onHeaderClick: onTitleClick ? onTitleClick : this.handleClick
		};

		if(title) {
			appHeaderProps.title = title;
		}

		if (centerImageSrc) {
			appHeaderProps.centerImageSrc = centerImageSrc;
		}

		if (rightImageSrc) {
			appHeaderProps.rightImageSrc = rightImageSrc;
		}

		return (
			<div className={appClassName}>
				<AppHeader {...appHeaderProps} />
				{children}
			</div>
		);
	}
}
