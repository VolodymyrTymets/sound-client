import React from 'react';
import MainPage from './pages/MainPage';
import MainPageIos from './pages/MainPageIos';

import 'bootstrap/dist/css/bootstrap.min.css';

const isSafari = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const App = () => {
	return isSafari() ? <MainPageIos/> : <MainPage />
};



export default App;
