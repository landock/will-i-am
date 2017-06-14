import React from 'react';

export default function AppHeader({ name, onHeaderClick, imgHeaderSrc, rightImageSrc }) {
  return (
    <div role="button" tabIndex={0} className="AppHeader" onClick={onHeaderClick}>
      <div className="tmpHeader">
        <div className="arrow"><i className="fa fa-angle-left" aria-hidden="true"></i></div>
        <div className="header-cp">
          {
            imgHeaderSrc && !name
              ? (<img className="app-header-img" alt={imgHeaderSrc} src={imgHeaderSrc} />)
              : name
          }
        </div>

	      {
		      rightImageSrc
			      ? (<div className="right-icon"><img src={rightImageSrc}/></div>)
			      : ''
	      }
      </div>
    </div>
  );
}
