import React from 'react';
import {Container} from '../../../components/Container';
import {Chart} from './Chart';
import {Filter} from './Filter';

export const LineStatistics = () => (
  <Container>
    <Filter />
    <Chart />
  </Container>
);
