import { styled } from '@mui/material/styles';

export const StyledRoot = styled('div')(({theme}: any) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

export const StyledSection = styled('div')(({theme}: any) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

export const StyledContent = styled('div')(({theme}: any) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));
