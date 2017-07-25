import React, { Component } from 'react';

import ee from '../../EventEmitter'

export default class AppTile extends Component {
	constructor(props) {
		super(props);
		this.handleTileClick = this.handleTileClick.bind(this);
		this.ee = ee;
	}

	handleTileClick() {
		this.ee.emit('changeApp', this.props.title);
	};

	render() {
		const { title, imgSrc, imgComponent, linkUrl } = this.props;

		let aProps = {
			id: title,
		};

		if (linkUrl) {
			aProps.href = linkUrl;
			aProps.target = "_blank";
			aProps.rel = "noopener noreferrer";
		} else {
			aProps.onClick = this.handleTileClick;
			aProps.role = "button";
			aProps.tabIndex = 0;
		}

		return (
			<a {...aProps}>
			{
				imgSrc
				? (<img className="icon" alt="icon" src={imgSrc} />)
				: (imgComponent)
			}
			</a>
		)
	}
}
