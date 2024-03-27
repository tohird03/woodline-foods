import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {useFormik} from 'formik';
import {IOrganisation} from '../../../api/organisation/types';
import {Modal} from '../../../components/Modal';
import {useStores} from '../../../store/store-context';

export const NotificationsPopover = observer(() => {
  const [organisationOption, setOrganisationOption] = useState<React.ReactNode[]>([]);
  const {organisationStore, appStore} = useStores();

  const formik = useFormik({
    initialValues: {
      message: '',
      org: '',
    },
    onSubmit: values => {
      appStore.sendMessages(values)
        .finally(() => {
          handleCloseNotificationModal();
        });
    },
  });

  const handleCloseNotificationModal = () => {
    appStore.setIsOpenNotificationModal(false);
  };

  useEffect(() => {
    organisationStore.getOrganisation({
      page: 1,
      size: 1000,
    })
      .then(res => {
        if (res?.orgList) {
          setOrganisationOption([
            <MenuItem key="all" value="all">All</MenuItem>,
            ...(
              res?.orgList?.map((org: IOrganisation) => (
                <MenuItem key={org?._id} value={org?._id}>{org?.name_org}</MenuItem>
              )) || []
            ),
          ]);
        }
      });
  }, []);

  return (
    <>
      <Modal
        open={appStore.isOpenNotificationModal}
        onButtonClose={handleCloseNotificationModal}
        title="Notification Add"
        width={430}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{display: 'grid', gap: '20px'}}>
            <TextField
              multiline
              rows={3}
              placeholder="Notification text write..."
              name="message"
              onChange={formik.handleChange}
              value={formik.values.message}
              required
            />
            <FormControl sx={{marginBottom: '10px'}} fullWidth>
              <InputLabel>Organisation</InputLabel>
              <Select
                name="org"
                label="Organisation"
                onChange={formik.handleChange}
                value={formik.values.org}
                required
              >
                {organisationOption}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              type="submit"
            >
              Send Notification
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  );
});
