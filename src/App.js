import React from 'react';
import { compose } from "recompose";
import { inject, useObserver } from "mobx-react";

import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './pages/MainPage';
import { InteractWindow } from './components/InteractWindow';

const App = ({ store }) => {
	const { windowInfo } = store;
	return useObserver(() => windowInfo.isInteracted ? <MainPage /> : <InteractWindow />)
};

export default compose(
	inject('store'),
)(App);

