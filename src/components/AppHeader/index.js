import React from 'react';

export default function AppHeader({ title, onHeaderClick, centerImageSrc, rightImageSrc }) {
	const isLargeHeader = centerImageSrc && title;
	const appHeaderClasses = isLargeHeader ? 'AppHeader large' : 'AppHeader';
  return (
	  <div role="button" tabIndex={0} className={appHeaderClasses} onClick={onHeaderClick}>
      <div className="tmpHeader">
        <div className="arrow"><i className="fa fa-angle-left" aria-hidden="true"></i></div>
        <div className="header-cp">
	        {centerImageSrc && (<img className="app-header-img" alt={centerImageSrc} src={centerImageSrc}/>)}
	        {title && (<span> {title}</span>)}
	        {
		        rightImageSrc
			        ? (<div className="app-header-right-img"><img alt={rightImageSrc} src={rightImageSrc}/></div>)
			        : ''
	        }
        </div>
      </div>
    </div>
  );
}
