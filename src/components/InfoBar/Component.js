import React from 'react';
// import { string, func } from 'prop-types';

const InfoBarComponent = ({ spectrumInfo }) => (
  <div className="d-flex flex-row justify-content-between">
      <p>Mean: {spectrumInfo.mean} </p>
      <p>Max: {spectrumInfo.max} </p>
      <p>M:</p>
      <p>M:</p>
  </div>
);

InfoBarComponent.propTypes = {

};

export { InfoBarComponent };
