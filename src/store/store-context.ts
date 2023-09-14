import React from 'react';
import {store} from './store';

const storesContext = React.createContext(store);

export const useStores = () => React.useContext(storesContext);
