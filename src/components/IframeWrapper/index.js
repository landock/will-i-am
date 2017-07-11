import React, { Component } from 'react';
import AppHeader from '../AppHeader';

export default class IframeWrapper extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { iframeWrapperClassName, title, closeApp, iframeUrl } = this.props;
		const aStyle = {
			display: 'block',
			height: '45px',
			lineHeight: '45px',
			width: '100%',
			color: 'black',
			backgroundColor: 'whitesmoke',
			textDecoration: 'underline',
			position: 'absolute',
			bottom: 0,
			borderTop: '1px solid #333'
		};

		const iframeStyle = {
			marginTop: '50px',
			width: "100%",
			height: "520px",
			backgroundColor: 'white',
		};

		return (
			<div className={iframeWrapperClassName || 'hi'}>
				<AppHeader title={title} onHeaderClick={() => this.props.closeApp()}/>
				<iframe
					style={iframeStyle}
					scrolling="yes"
					frameBorder="no"
					title="facebook"
					src={iframeUrl}
				/>
				<a className="browser-view" href={iframeUrl} target="_blank" rel="noopener noreferrer">
					View the full website <i className="fa fa-angle-right" aria-hidden="true"></i>
				</a>
			</div>
		);
	}
}
