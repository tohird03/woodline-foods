import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {IOrganisation} from '../../../api/products/types';
import {Modal} from '../../../components/Modal';
import {lunchStore} from '../../../store/lunch';
import {productStore} from '../../../store/products';

export const AddLunch = observer(() => {
  const [organisationOption, setOrganisationOption] = useState<React.ReactNode[]>([]);

  const formik = useFormik({
    initialValues: {
      name: '',
      org: '',
      cost: 0,
    },
    onSubmit: values => {
      lunchStore.addLunchs(values)
        .finally(() => {
          handleClose();
        });
    },
  });

  const handleClose = () => {
    lunchStore.setIsOpenLunchModal(false);
  };

  useEffect(() => {
    productStore.getOrganisation()
      .then(res => {
        if (res) {
          setOrganisationOption(
            res?.data?.map((org: IOrganisation) => (
              <MenuItem key={org?._id} value={org?._id}>{org?.name_org}</MenuItem>
            ))
          );
        }
      });
  }, []);

  return (
    <Modal
      open={lunchStore.isOpenAddLunchModal}
      onButtonClose={handleClose}
      title="Add new organisation"
      width={400}
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{width: '100%', marginBottom: '10px'}}
          placeholder="New product name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
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

        <TextField
          label="Cost"
          value={formik.values.cost}
          type="number"
          onChange={formik.handleChange}
          minRows={0}
          required
          name="cost"
          sx={{width: '100%', marginBottom: '10px'}}
        />

        <Button
          sx={{width: '100%'}}
          variant="contained"
          type="submit"
        >
          Add
        </Button>
      </form>
    </Modal>
  );
});
