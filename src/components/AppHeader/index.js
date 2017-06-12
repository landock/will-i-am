import React from 'react';

export default function AppHeader({ name, onHeaderClick, imgHeaderSrc }) {
  return (
    <div role="button" tabIndex={0} className="AppHeader" onClick={onHeaderClick}>
      <div className="tmpHeader">
        <div className="arrow">{'<'}</div>
        <div className="header-cp">
          {
            imgHeaderSrc && !name
              ? (<img className="app-header-img" alt={imgHeaderSrc} src={imgHeaderSrc} />)
              : name
          }
        </div>
      </div>
    </div>
  );
}
