import React, { Component } from 'react';
import { Sinewave } from "./components/Sinewave";

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Sinewave />
      </div>
    );
  }
}

export default App;
