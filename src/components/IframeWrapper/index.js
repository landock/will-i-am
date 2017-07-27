import React from 'react';
import AppFrame from '../AppFrame';

export default function IframeWrapper({ appClassName, title, iframeUrl, showFooter } ) {


		const iframeStyle = {
			marginTop: '50px',
			width: "100%",
			height: "575px",
			backgroundColor: 'white',
		};

		return (
				<AppFrame
					appClassName={appClassName}
					title={title}
				>
					<iframe
						style={iframeStyle}
						scrolling="yes"
						frameBorder="no"
						sandbox="allow-popups allow-forms allow-same-origin allow-scripts"
						title={title}
						src={iframeUrl}
					/>
					{
						showFooter && (
						<a
							className="browser-view"
							href={iframeUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							View the full website <i className="fa fa-angle-right" aria-hidden="true"></i>
						</a>
						)
					}
			</AppFrame>
		);
}
