import {dialogClasses} from '@mui/material/Dialog';
import {dialogActionsClasses} from '@mui/material/DialogActions';
import {dialogContentClasses} from '@mui/material/DialogContent';
import {dialogTitleClasses} from '@mui/material/DialogTitle';

export const styles = {
  dialog: (width?: number, fullHeight?: boolean) => ({
    [`& .${dialogClasses.paper}`]: {
      width: width ? `${width}px` : '450px',
      maxWidth: 'none',
      height: fullHeight ? 'calc(100vh - 80px)' : 'max-content',
      borderRadius: '10px',
      padding: '10px',
    },

    [`& .${dialogTitleClasses.root}`]: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '32px',
    },

    [`& .${dialogContentClasses.root}`]: {
      '& .MuiBox-root': {
        position: 'relative',
        backgroundColor: 'white',
        flexDirection: 'column',
      },
    },

    [`& .${dialogActionsClasses.root}`]: {
      padding: '24px 32px',

      '&>:not(:first-of-type)': {
        marginLeft: '16px',
      },
    },
  }),

  closeButton: {
    position: 'absolute',
    right: '7px',
    top: '10px',
    width: '40px',
    height: '40px',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
};
