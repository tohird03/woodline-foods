import React, {useState} from 'react';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {IEditAdmin} from '../../../../api/admin/types';
import {adminStore} from '../../../../store/admin';
import {roleOptions} from '../../constants';

interface EditAdminModalProps {
  adminId: string;
}

export const EditAdminModal: React.FC<EditAdminModalProps> = ({adminId}) => {
  const [editedRole, setEditedRole] = useState<IEditAdmin | string>('');

  const handleCancel = () => {
    adminStore.setIsOpenEditAdminModal(false);
  };

  const handleEdit = () => {
    adminStore.setIsOpenEditAdminModal(false);
    adminStore.editAdmin({
      _id: adminId,
      role: editedRole as string,
    });
  };

  const handleChange = (e: SelectChangeEvent<typeof editedRole>) => {
    setEditedRole(e.target.value);
  };

  return (
    <Dialog
      onClose={handleCancel}
      open={adminStore.isOpenEditAdminModal}
    >
      <DialogTitle>Edit Admin Role</DialogTitle>
      <DialogContent>
        <Card>
          <FormControl fullWidth>
            <Select
              onChange={handleChange}
              value={editedRole}
              placeholder="Tanlang"
              required
            >
              {roleOptions}
            </Select>
          </FormControl>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleEdit} color="primary">
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
