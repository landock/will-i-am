import React, { Component } from 'react';

// components
import App from './App';
import AppSwitcher from './components/AppSwitcher';
import ee from './EventEmitter'

export default class AppContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			currentApp: null,
			isHomeDisplayed: true,
		};

		this.changeApp = this.changeApp.bind(this);
		this.goHome = this.goHome.bind(this);
		this.handleHomeClick = this.handleHomeClick.bind(this);

	}

	componentDidMount() {
		this.ee = ee;
		this.ee.on('changeApp', this.changeApp);
		this.ee.on('goHome', this.goHome);
	}

	componentWillUnmount() {
		this.ee.off('changeApp', this.changeApp);
	}

	handleHomeClick() {
		this.ee.emit('goHome');
	}

	goHome() {
		this.setState({
			currentApp: '',
			isHomeDisplayed: true,
		})
	}

	changeApp(name) {
		return this.setState({
			currentApp: name,
			isHomeDisplayed: false,
		});
	}

	render() {

		const {
			isHomeDisplayed,
		} = this.state;

		return (
			<App
				isHomeDisplayed={isHomeDisplayed}
				onHomeClick={this.handleHomeClick}
			>

				{<AppSwitcher currentApp={this.state.currentApp}/>}
			</App>
		)
	}
}

