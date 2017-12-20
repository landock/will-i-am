import React, {Component} from 'react';
import moment from 'moment';

import ee from '../../EventEmitter'

export default class LegalFooter extends Component {

    constructor(props) {
	super(props);
	this.ee = ee;
	this.handleTermsAndConditionsClick = this.handleTermsAndConditionsClick.bind(this);
	this.handlePrivacyPolicyClick = this.handlePrivacyPolicyClick.bind(this);
    }

    handleTermsAndConditionsClick() {
	this.ee.emit('changeApp', 'terms');
    }

    handlePrivacyPolicyClick() {
	this.ee.emit('changeApp', 'privacy');
    }
    render() {
	return (
          <div className="legal-container">
            <div className="legal-links">
              <span>Copyright {moment().format('YYYY')}. All rights reserved.</span>
              <a onClick={this.handleTermsAndConditionsClick}role="button" tabIndex={0} className="terms">Terms and Conditions</a>
              <a onClick= {this.handlePrivacyPolicyClick} role="button" tabIndex={0} className="policy">Privacy Policy</a>
            </div>
          </div>
	)
    }
}
