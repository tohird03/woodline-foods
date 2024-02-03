import './admin.scss';
import 'react-phone-input-2/lib/style.css';

import React, {useEffect, useMemo} from 'react';
import PhoneInput from 'react-phone-input-2';
import {observer} from 'mobx-react';
import {Button, FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import {useFormik} from 'formik';
import {IOrganisation} from '../../../api/products/types';
import {Modal} from '../../../components/Modal';
import {adminStore} from '../../../store/admin';
import {productStore} from '../../../store/products';
import { rolesStore } from '../../../store/roles/roles';
import { IRole } from '../../../api/roles/types';

export const AddAdmin = observer(() => {
  const formik = useFormik({
    initialValues: {
      phone_number: '',
      password: '',
      fullname: '',
      org: '',
      role: '',
    },
    onSubmit: values => {
      adminStore.addAdmin({
        ...values,
        phone_number: values.phone_number?.slice(4)?.split(' ').join(''),
      })
        .finally(() => {
          handleClose();
        });
    },
  });

  const handleClose = () => {
    adminStore.setIsOpenNewAdminModal(false);
  };

  const organisationOptions = useMemo(() => (
    productStore.organisations.map((org: IOrganisation) => (
      <MenuItem key={org?._id} value={org?._id}>{org?.name_org}</MenuItem>
    ))
  ), [productStore.organisations]);

  useEffect(() => {
    productStore.getOrganisation();
    rolesStore.getRoles();

    return () => {
      productStore.setOrganisation([]);
    };
  }, []);

  const roleOptions = rolesStore.roles.map((role: IRole) => (
    <MenuItem key={role._id} value={role._id}>
      {role.title}
    </MenuItem>
  ));

  return (
    <Modal
      open={adminStore.isOpenNewAdminModal}
      onButtonClose={handleClose}
      title="Add new amdin"
    >
      <form className="form" onSubmit={formik.handleSubmit}>
        <PhoneInput
          country={'uz'}
          onChange={formik.handleChange}
          value={formik.values.phone_number}
          inputProps={{
            name: 'phone_number',
            required: true,
            autoFocus: true,
            onChange: formik.handleChange,
            className: 'form__password-input form__phone-input',
            autocomplete: 'off',
          }}
        />
        <div className="form__password-wrapper">
          <input
            onChange={formik.handleChange}
            value={formik.values.password}
            minLength={8}
            className="form__password-input"
            type="text"
            placeholder="Password"
            name="password"
            required
          />
        </div>
        <div className="form__password-wrapper">
          <input
            onChange={formik.handleChange}
            value={formik.values.fullname}
            className="form__password-input"
            type="text"
            placeholder="Fullname"
            name="fullname"
            required
          />
        </div>
        <FormControl fullWidth>
          <InputLabel>Organisation</InputLabel>
          <Select
            onChange={formik.handleChange}
            value={formik.values.org}
            name="org"
            label="Organisation"
            required
          >
            {organisationOptions}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>
          <Select
            onChange={formik.handleChange}
            value={formik.values.role}
            name="role"
            label="Organisation"
            required
          >
            {roleOptions}
          </Select>
        </FormControl>
        <Button
          size="small"
          variant="contained"
          color="primary"
          className="form__otp-submit"
          type="submit"
        >
          Login
        </Button>
      </form>
    </Modal>
  );
});
