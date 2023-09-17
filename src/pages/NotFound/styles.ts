import {styled} from '@mui/material/styles';

export const StyledContent = styled('div')({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
});

export const notFoundStyles = {
  heading: {
    color: 'text.secondary',
  },
  imgWrappper: {
    height: 260,
    mx: 'auto',
    my: {xs: 5, sm: 10},
  },
};
