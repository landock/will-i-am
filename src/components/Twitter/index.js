
import React from 'react';
import { Timeline } from 'react-twitter-widgets';
import AppHeader from '../AppHeader';

export default function Twitter({ closeApp }) {
  const dataSource = {
    sourceType: 'profile',
    screenName: 'iamwill',
  };
  const options = {
    height: 556,
  };
  return (
    <div className="Twitter">
      <AppHeader name="twitter" onHeaderClick={() => closeApp()} />
      <Timeline dataSource={dataSource} options={options} />
    </div>
  );
}
