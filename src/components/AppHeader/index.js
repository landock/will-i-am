import React from 'react';

export default function AppHeader({ name, onHeaderClick, imgHeaderSrc, rightImageSrc }) {
	const isLargeHeader = imgHeaderSrc && name;
	const appHeaderClasses = isLargeHeader ? 'AppHeader large' : 'AppHeader';
  return (
	  <div role="button" tabIndex={0} className={appHeaderClasses} onClick={onHeaderClick}>
      <div className="tmpHeader">
        <div className="arrow"><i className="fa fa-angle-left" aria-hidden="true"></i></div>
        <div className="header-cp">
	        {imgHeaderSrc && (<img className="app-header-img" alt={imgHeaderSrc} src={imgHeaderSrc}/>)}
	        {name && (<span> {name}</span>)}
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
