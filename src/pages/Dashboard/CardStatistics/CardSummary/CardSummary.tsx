import './card.css';

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import CountUp from 'react-countup';
import {useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react';
import {Card, Typography} from '@mui/material';
import {ROUTES} from '../../../../constants/router';
import {dashboardStore} from '../../../../store/dashboard';

type Props = {
  title: string;
  titleInCome: string;
  totalInCome: number;

  titleExpense: string;
  totalExpense: number;
  icon?: React.ReactNode;
  color?: string;
  sx?: Object;
  type: 'today' | 'yesterday';
};

const formatter = (value: number) => <CountUp duration={2} end={value} separator=" " />;

export const CardSummary = observer(({
  title,
  titleInCome,
  totalInCome,
  titleExpense,
  totalExpense,
  icon,
  color = 'primary',
  sx,
  type,
  ...other
}: Props) => {
  const navigate = useNavigate();

  const handleReloadToProduct = () => {
    const today = new Date();
    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    const todayString = today.toISOString().split('T')[0];
    const yesterdayString = yesterday.toISOString().split('T')[0];

    const date = type === 'today' ? todayString : yesterdayString;

    dashboardStore.setStartDate(date);
    dashboardStore.setEndDate(date);

    navigate(ROUTES.productSumAnalitic);
  };

  return (
    <Card
      sx={{
        p: 3,
        boxShadow: 0,
        textAlign: 'center',
        cursor: 'pointer',
        color: (theme: any) => theme.palette[color].darker,
        bgcolor: (theme: any) => theme.palette[color].lighter,
        ...sx,
      }}
      onClick={handleReloadToProduct}
      {...other}
    >
      <Typography variant="subtitle1" sx={{opacity: 0.72, mb: 2}}>
        {title}
      </Typography>
      <div className="card__body card__income">
        <Typography className="card__title" variant="subtitle2">
          {titleInCome}:
        </Typography>
        <Typography variant="h5">{formatter(totalInCome)} сум</Typography>
      </div>
      <div className="card__body card__expense">
        <Typography className="card__title" variant="subtitle2">
          {titleExpense}
        </Typography>
        <Typography variant="h5">{formatter(totalExpense)} сум</Typography>
      </div>
    </Card>
  );
});
