import React from 'react';
import style from './PageContainer.module.sass';

function PageContainer (props) {
  return <div className={style.main}>{props.children}</div>;
}

export default PageContainer;
