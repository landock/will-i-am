import React, { Component } from 'react';
import AppHeader from '../AppHeader';

const iframeSrcUrl = 'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fwilliam%2F&tabs=timeline&width=360&height=620&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=263980326955302';

export default class Facebook extends Component {
  constructor(props) {
    super(props);

    this.onFacebookHeaderClick = this.onFacebookHeaderClick.bind(this);
  }

  onFacebookHeaderClick() {
    this.props.closeApp();
  }

  render() {
    return (
      <div className="Facebook-app">
        <AppHeader name="facebook" onHeaderClick={() => this.onFacebookHeaderClick()} />
        <iframe
          width="100%"
          height="620"
          scrolling="no"
          frameBorder="no"
          title="facebook"
          src={iframeSrcUrl}
        />
      </div>
    );
  }
}
