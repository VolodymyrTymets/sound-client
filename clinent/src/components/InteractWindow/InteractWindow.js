import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneAlt } from "@fortawesome/free-solid-svg-icons";
import { useWindowSize } from "../../hooks/useWindowSize";
import './style.css';

const InteractWindow = ({ onClick }) => {
  const size = useWindowSize();

  return size.height ? (
    <div onClick={onClick} className="interact-window" style={size}>
      <FontAwesomeIcon icon={faMicrophoneAlt} className="interact-window-icon"/>
      <p onClick={onClick}>Tap to start</p>
    </div>
  ) : null;
};

export default InteractWindow;
