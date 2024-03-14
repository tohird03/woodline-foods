import React from 'react';
import {Outlet} from 'react-router-dom';

// eslint-disable-next-line react/function-component-definition
export default function SimpleLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
