import React, { useState, useEffect } from 'react';
import { func } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneAlt } from '@fortawesome/free-solid-svg-icons';
import './style.css'

const InteractWindowComponent = ({
  onInteractWithWindowClick,
  height = window.innerHeight,
  width = window.innerWidth
}) => {
  const [windowSize, setWindowSize] = useState({});
  useEffect(() => {
    setTimeout(() => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }, 500)
  }, []);

  return windowSize.height ? (
    <div onClick={onInteractWithWindowClick} className="interact-window" style={{...windowSize }}>
      <FontAwesomeIcon icon={faMicrophoneAlt} className="interact-window-icon"/>
      <p onClick={onInteractWithWindowClick}>Tap to start</p>
    </div>
  ) : null;
}

InteractWindowComponent.propTypes = {
  onInteractWithWindowClick: func
};

export { InteractWindowComponent };
