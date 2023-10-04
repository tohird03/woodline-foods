import React from 'react';
import {Switch, SwitchProps} from '@mui/material';
import {styled} from '@mui/material/styles';

export const foodStyles = {
  addFoodsWRapper: {
    display: 'flex',
    flexDirection: {xs: 'column !important', md: 'row !important'},
    gap: '20px',
    alignItems: 'flex-start',
    marginBottom: '30px',
    width: '100%',
  },
  addFoodsProducts: {
    width: {xs: '100%', md: '50%'},
    gap: '20px',
    display: 'grid',
    marginTop: '15px',
  },
  addFoodsProductBox: {
    display: 'flex',
    flexDirection: 'row !important',
    gap: '10px',
  },
  addFoodFormControl: {
    width: '70%',
  },
  addFoodsFormBox: {
    width: '100%',
  },
  addFoodsLeftWrapper: {
    gap: '20px',
    display: 'grid',
    width: {xs: '100%', md: '50%'},
    marginTop: '15px',
  },
  orderProductChip: {
    color: 'white',
  },
  changeVerifyConfirm: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row !important',
    gap: '20px',
    marginTop: '10px',
  },
};

export const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({theme}) => ({
  width: 42,
  height: 20,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(22px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 16,
    height: 16,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));
