import React from 'react';
// import { string, func } from 'prop-types';

const InfoBarComponent = ({ barInfo }) => (
  <div className="d-flex flex-row justify-content-between">
      <p>M: {barInfo.mean} </p>
      <p>M:</p>
      <p>M:</p>
      <p>M:</p>
  </div>
);

InfoBarComponent.propTypes = {

};

export { InfoBarComponent };
