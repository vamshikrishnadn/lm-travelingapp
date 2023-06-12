import Spinner from 'react-bootstrap/esm/Spinner';
import React from 'react';

const AppLoader = () => {
  return (
    <div className='text-center mt-4'>
      <Spinner size='lg' />
    </div>
  );
};

export default AppLoader;
