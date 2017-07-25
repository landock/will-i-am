import React from 'react';

export default function AppHeader({ title, onHeaderClick, leftContent, centerContent, rightContent }) {
  const isLargeHeader = centerContent && title;
  const appHeaderClasses = isLargeHeader ? 'AppHeader large' : 'AppHeader';
  return (
    <div role="button" tabIndex={0} className={appHeaderClasses} onClick={onHeaderClick}>
      <div className="tmpHeader">
	<div className="header-cp">
	  {leftContent}
	  {
	    centerContent && (
	      <div className="app-header-img"> {centerContent}</div>
	    )
	  }
	  {
	    title && (
	    <span>{title}</span>
	    )
	  }
	  {
	    rightContent && (
	      <div className="app-header-right">{rightContent}</div>
	    )
	  }
	</div>
      </div>
    </div>
  );
}

AppHeader.defaultProps = {
  leftContent: (<div className="arrow"><i className="fa fa-angle-left" aria-hidden="true"></i></div>),
};
