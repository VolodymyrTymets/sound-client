import React from 'react';
import { func } from 'prop-types';
import './style.css'

const InteractWindowComponent = ({ onInteractWithWindowClick }) =>
  <div onClick={onInteractWithWindowClick} className="interact-window">
    <p onClick={onInteractWithWindowClick}>Tab to Start</p>
  </div>;

InteractWindowComponent.propTypes = {
  onInteractWithWindowClick: func
};

export { InteractWindowComponent };
