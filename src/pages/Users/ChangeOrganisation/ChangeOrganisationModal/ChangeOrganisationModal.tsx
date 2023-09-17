import React, {useEffect, useMemo} from 'react';
import {observer} from 'mobx-react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import {useFormik} from 'formik';
import {IOrganisation} from '../../../../api/users/types';
import {Modal} from '../../../../components/Modal';
import {usersStore} from '../../../../store/users';
import {UsersStyles} from '../../styles';

export const ChangeOrganisationModal = observer(() => {
  const formik = useFormik({
    initialValues: {
      org: '',
    },
    onSubmit: values => {
      usersStore.changeOrganisation({
        ...values,
        user: usersStore?.singleUser?._id!,
      })
        .finally(() => {
          handleClose();
        });
    },
  });

  const handleClose = () => {
    usersStore.setIsOpenOrganisationModal(false);
  };

  const organisationOption = useMemo(() => (
    usersStore.organisations?.map((org: IOrganisation) => (
      <MenuItem
        sx={org?._id === usersStore?.singleUser?.org?._id
          ? UsersStyles.changeOrgMenuItem
          : {}
        }
        key={org?._id} value={org?._id}
      >
        {org?.name_org}
      </MenuItem>
    ))
  ),
  [usersStore.organisations]);

  useEffect(() => {
    usersStore.getOrganisation({
      page: 1,
      size: 1000,
    });

    return () => {
      usersStore.setOrganisation([]);
      usersStore.setSingleUser(null);
    };
  }, []);

  return (
    <Modal
      open={usersStore.isOpenOrganisationModal}
      onButtonClose={handleClose}
      title="Change organisation"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <FormControl sx={UsersStyles.changeOrgFormControl} fullWidth>
            <InputLabel>Organisation</InputLabel>
            <Select
              onChange={formik.handleChange}
              defaultValue={usersStore?.singleUser?.org?._id}
              label="Organisation"
              name="org"
              required
            >
              {organisationOption}
            </Select>
          </FormControl>
          <Button
            sx={UsersStyles.fullWidth}
            variant="contained"
            type="submit"
          >
            Change organisation
          </Button>
        </Box>
      </form>
    </Modal>
  );
});
