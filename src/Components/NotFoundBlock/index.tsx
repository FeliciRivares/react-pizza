import React from 'react';
import style from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={style.root}>
      <h1>
        <span>🧐</span>
        <br />
        Oops nothing found
      </h1>
    </div>
  );
};

export default NotFoundBlock;
