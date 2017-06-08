import React from 'react';

export default function AppHeader({ name, onHeaderClick }) {
  return (
    <div role="button" tabIndex={0} className="AppHeader" onClick={onHeaderClick}>
      <div className="tmpHeader">
        <div className="arrow">{'<'}</div>
        <div className="header-cp">{name}</div>
      </div>
    </div>
  );
}
