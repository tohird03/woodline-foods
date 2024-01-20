import {LabelType} from './types';

export const paginationShowOption = [10, 20, 50, 100];

export const getPaginationCount = ({from, to, count}: LabelType) => (
  `${from}-${to} from, ${count}`
);
