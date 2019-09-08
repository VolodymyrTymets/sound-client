import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './style.css';

const Loader = ({ height, width,  isLoading }) =>
  isLoading ?  <div className="d-flex flex-row container-loader" style={{height, width }}>
    <div>
    <FontAwesomeIcon icon={faSpinner} spin className="icon-loader" />
    </div>
  </div> : null;


export { Loader };
