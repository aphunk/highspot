import React from 'react';
import Loader from 'react-loader-spinner';
import './ProgressSpinner.css';

const ProgressSpinner = () => {

  return (
    <div className="ProgressWrapper">
      <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={100}
        width={100}
      />
      <strong>Hang tight, loading some magic</strong>
    </div>
  )
};

export default ProgressSpinner;