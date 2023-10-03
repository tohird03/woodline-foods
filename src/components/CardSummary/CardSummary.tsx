import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import CountUp from 'react-countup';
import {Card, Typography} from '@mui/material';
import {alpha, styled} from '@mui/material/styles';

const StyledIcon = styled('div')(({theme}) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

type Props = {
  title: string;
  total: number;
  icon: React.ReactNode;
  color?: string;
  sx?: Object;
};

const formatter = (value: number) => <CountUp duration={2} end={value} separator="." />;

export const CardSummary = ({title, total, icon, color = 'primary', sx, ...other}: Props) => (
  <Card
    sx={{
      py: 3,
      boxShadow: 0,
      textAlign: 'center',
      color: (theme: any) => theme.palette[color].darker,
      bgcolor: (theme: any) => theme.palette[color].lighter,
      ...sx,
    }}
    {...other}
  >
    <StyledIcon
      sx={{
        color: (theme: any) => theme.palette[color].dark,
        backgroundImage: (theme: any) =>
          `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
            theme.palette[color].dark,
            0.24
          )} 100%)`,
      }}
    >
      {icon}
    </StyledIcon>

    <Typography variant="h3">{formatter(total)}</Typography>

    <Typography variant="subtitle2" sx={{opacity: 0.72}}>
      {title}
    </Typography>
  </Card>
);
