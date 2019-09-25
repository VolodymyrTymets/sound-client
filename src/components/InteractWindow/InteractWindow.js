import React from "react";
import { compose } from 'ramda';
import { inject } from 'mobx-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneAlt } from "@fortawesome/free-solid-svg-icons";
import { useWindowSize } from "../../hooks/useWindowSize";
import './style.css';

const InteractWindow = ({ store }) => {
  const size = useWindowSize();
  const onInteractWithWindowClick = () => store.windowInfo.interactWithWindow();
  return size.height ? (
    <div onClick={onInteractWithWindowClick} className="interact-window" style={size}>
      <FontAwesomeIcon icon={faMicrophoneAlt} className="interact-window-icon"/>
      <p onClick={onInteractWithWindowClick}>Tap to start</p>
    </div>
  ) : null;
};

export default compose(
  inject('store'),
)(InteractWindow)
