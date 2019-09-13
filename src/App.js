import React from 'react';
import { compose } from "recompose";
import { inject, useObserver } from "mobx-react";
import { InteractWindow } from './components/InteractWindow'
import MainPage from './pages/MainPage';
import MainPageIos from './pages/MainPageIos';

import 'bootstrap/dist/css/bootstrap.min.css';

const isSafari = () => window.location.search.indexOf('ios') !== -1;

const AndroidAppComponent = ({ store }) => {
	const { windowInfo } = store;
	return useObserver(() => windowInfo.isInteracted ? <MainPage /> : <InteractWindow />)
};

const AndroidApp = compose(
	inject('store'),
)(AndroidAppComponent);

const App = () => {
	return isSafari() ? <MainPageIos/> : <AndroidApp />
};

export default App;





