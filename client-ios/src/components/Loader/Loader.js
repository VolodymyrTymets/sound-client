import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import { useWindowSize } from '../../hooks/useWindowSize'

const Loader = ({ }) => {
  const size = useWindowSize();
  return (
    <div className="d-flex flex-row container-loader" style={{...size}}>
      <div>
        <FontAwesomeIcon icon={faSpinner} spin className="icon-loader"/>
      </div>
    </div>
  );
};

export { Loader };
