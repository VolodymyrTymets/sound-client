import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './style.css';

const Loader = ( ) =>
  <div className="d-flex flex-row container-loader">
    <FontAwesomeIcon icon={faSpinner} rotation={true} className="icon-loader" />
  </div>;


export { Loader };
