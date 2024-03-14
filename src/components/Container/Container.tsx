import './container.css';

import React from 'react';

type Props = {
  children: JSX.Element | React.ReactNode;
};

export const Container = ({children}: Props) => (
  <div className="container">
    {children}
  </div>
);
