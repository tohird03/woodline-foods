import React, {FC} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, IconButton} from '@mui/material';
import {DialogActionsProps} from '@mui/material/DialogActions/DialogActions';
import {DialogContentProps} from '@mui/material/DialogContent/DialogContent';
import {DialogTitleProps} from '@mui/material/DialogTitle/DialogTitle';
import {styles} from './styles';

type TProps = DialogProps & {
  dialogActions?: React.ReactNode;
  dialogActionsProps?: DialogActionsProps;
  dialogContentProps?: DialogContentProps;
  dialogTitleProps?: DialogTitleProps;
  title?: string;
  width?: number;
  fullHeight?: boolean;
  onButtonClose?: () => void;
};

export const Modal: FC<TProps> = ({
  children,
  dialogActions,
  dialogActionsProps,
  dialogContentProps,
  dialogTitleProps,
  onButtonClose,
  title,
  width,
  fullHeight,
  ...rest
}) => {

  const handleCloseButtonClick = () => {
    onButtonClose?.();
  };

  return (
    <Dialog
      {...rest}
      sx={styles.dialog(width, fullHeight)}
      onClose={onButtonClose}
    >
      {onButtonClose && (
        <IconButton onClick={handleCloseButtonClick} sx={styles.closeButton}>
          <CloseIcon />
        </IconButton>
      )}

      {title &&
        <DialogTitle {...dialogTitleProps}>{title}</DialogTitle>
      }


      <DialogContent {...dialogContentProps}>{children}</DialogContent>

      {dialogActions && <DialogActions {...dialogActionsProps}>{dialogActions}</DialogActions>}
    </Dialog>
  );
};
