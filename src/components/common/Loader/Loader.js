import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './style.css';

const Loader = ({ height = window.innerHeight, width = window.innerWidth }) =>
  <div className="d-flex flex-row container-loader" style={{ width, height }}>
    <div>
    <FontAwesomeIcon icon={faSpinner} spin className="icon-loader" />
    </div>
  </div>;

export { Loader };
