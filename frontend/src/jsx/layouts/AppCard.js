import React from 'react';

const AppCard = ({ children }) => {
  return (
    <div className={'container'}>
      <div className='card my-4'>
        <div className='card-body'>{children}</div>
      </div>
    </div>
  );
};

export default AppCard;
