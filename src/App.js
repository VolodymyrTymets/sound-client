import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainPageIos from './pages/MainPageIos';
import MainPage from './pages/MainPage';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	return (
		<Router >
			<Route path="/" exact component={MainPage} />
			<Route path="/ios/" component={MainPageIos} />
		</Router>
	)
};

export default App;





