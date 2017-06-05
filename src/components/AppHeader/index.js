
import React from 'react';

export default function AppHeader({name, onHeaderClick}) {
	return(
		<div className="AppHeader" onClick={onHeaderClick}>
			<div className="tmpHeader">
				<div className="arrow">{'<'}</div>
			    <div className={name + '-header-cp'}>{name}</div>
			</div>
		</div>
    );
}
