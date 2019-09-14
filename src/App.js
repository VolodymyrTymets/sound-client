import React from 'react';
import MainPage from './pages/MainPage';
import MainPageIos from './pages/MainPageIos';

import 'bootstrap/dist/css/bootstrap.min.css';

const isSafari = () => window.location.pathname.indexOf('ios') !== -1;

const App = () => {
	return isSafari() ? <MainPageIos/> : <MainPage />
};

export default App;





