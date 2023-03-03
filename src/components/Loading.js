import React from 'react';
import Loader from 'react-loader-spinner';
import "../sass/loading.scss";

function Loading() {
  return (
    <div className="loading__container">
      <Loader 
        type="ThreeDots"
        height={60}
        color="var(--main-color)"
        width={60}
        timeout={3000}
      />
    </div>
  )
}

export default Loading;
