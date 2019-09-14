import React from 'react';
import { func } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneAlt } from '@fortawesome/free-solid-svg-icons';
import { useWindowSize } from "../../hooks/useWindowSize";

import './style.css'

const InteractWindowComponent = ({
  onInteractWithWindowClick,
}) => {
  const size = useWindowSize();
  return size.height ? (
    <div onClick={onInteractWithWindowClick} className="interact-window" style={size}>
      <p>{size.height}X{size.width}</p>
      <FontAwesomeIcon icon={faMicrophoneAlt} className="interact-window-icon"/>
      <p onClick={onInteractWithWindowClick}>Tap to start</p>
    </div>
  ) : null;
};

InteractWindowComponent.propTypes = {
  onInteractWithWindowClick: func
};

export { InteractWindowComponent };
