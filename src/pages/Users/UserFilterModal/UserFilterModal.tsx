/* eslint-disable no-extra-boolean-cast */
import React, {useEffect, useMemo, useState} from 'react';
import {observer} from 'mobx-react';
import {Button, FormControl, InputLabel, Select} from '@mui/material';
import {Select as AntSelect} from 'antd';
import {useFormik} from 'formik';
import {IOrganisation} from '../../../api/users/types';
import {Modal} from '../../../components/Modal';
import {usersStore} from '../../../store/users';
import {activeOptions, verifyOptions} from '../constants';
import {UsersStyles} from '../styles';

export const UserFilterModal = observer(() => {
  const [orgFilter, setOrgFilter] = useState<string[]>();
  const formik = useFormik({
    initialValues: {
      org: usersStore.filterUser?.org || null,
      verified:
      (usersStore.filterUser?.verified === true
      || usersStore.filterUser?.verified === false) ? String(usersStore.filterUser?.verified) : null,
      active: (
        usersStore.filterUser?.active === true
        || usersStore.filterUser?.active === false
      ) ? String(usersStore.filterUser?.active) : null,
    },
    onSubmit: values => {
      const isVerify = String(values?.verified) === 'true';
      const isActive = String(values?.active) === 'true';

      usersStore.setFilterUser({
        org: orgFilter,
        ...(values?.verified ? {verified: isVerify} : {}),
        ...(values?.active ? {active: isActive} : {}),
      });
      handleClose();
    },
  });

  const handleOrgFilter = (value: string[]) => {
    setOrgFilter(value);
  };

  const handleClose = () => {
    usersStore.setIsOpenFilterModal(false);
  };

  const handleClearFilter = () => {
    formik.resetForm();
    formik.setValues({
      org: null,
      active: null,
      verified: null,
    });
    setOrgFilter([]);
    usersStore.setFilterUser(null);
  };

  const organisationOptions = useMemo(() => (
    usersStore.organisations.map((org: IOrganisation) => (
      {
        value: org?._id,
        label: org?.name_org,
      }
    ))
  ), [usersStore.organisations]);

  useEffect(() => {
    usersStore.getOrganisation();

    return () => {
      usersStore.setOrganisation([]);
      usersStore.setSingleUser(null);
    };
  }, []);

  return (
    <Modal
      open={usersStore.isOpenFilterModal}
      onButtonClose={handleClose}
      title="Filter"
    >
      <form
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '20px',
        }}
        onSubmit={formik.handleSubmit}
      >
        <AntSelect
          mode="multiple"
          allowClear
          style={{width: '100%'}}
          placeholder="Please select Organisation"
          defaultValue={usersStore.filterUser?.org}
          onChange={handleOrgFilter}
          options={organisationOptions}
          value={orgFilter}
        />

        <FormControl fullWidth>
          <InputLabel>Проверено</InputLabel>
          <Select
            onChange={formik.handleChange}
            value={formik.values.verified}
            name="verified"
            label="Verified"
            placeholder="Verified"
          >
            {verifyOptions}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Активно</InputLabel>
          <Select
            onChange={formik.handleChange}
            value={formik.values.active}
            name="active"
            label="Активно"
            placeholder="Активно"
          >
            {activeOptions}
          </Select>
        </FormControl>
        <div style={{display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'space-between'}}>
          <Button
            sx={UsersStyles.addBalanceSubmitBtn}
            variant="contained"
            type="button"
            onClick={handleClearFilter}
            color="error"
          >
            Clear
          </Button>
          <Button
            sx={UsersStyles.addBalanceSubmitBtn}
            variant="contained"
            type="submit"
          >
            Filter
          </Button>
        </div>
      </form>
    </Modal>
  );
});
