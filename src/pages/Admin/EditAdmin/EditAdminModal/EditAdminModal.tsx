import React, {useEffect, useMemo, useState} from 'react';
import PhoneInput from 'react-phone-input-2';
import {observer} from 'mobx-react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {Modal} from 'antd';
import {useFormik} from 'formik';
import {IEditAdmin} from '../../../../api/admin/types';
import {IOrganisation} from '../../../../api/foods/types';
import {IRole} from '../../../../api/roles/types';
import {adminStore} from '../../../../store/admin';
import {productStore} from '../../../../store/products';
import {rolesStore} from '../../../../store/roles/roles';

interface EditAdminModalProps {
  adminId: string;
}

export const EditAdminModal: React.FC<EditAdminModalProps> = observer(({adminId}) => {
  const [editedRole, setEditedRole] = useState<any>(null);

  const handleCancel = () => {
    adminStore.setIsOpenEditAdminModal(false);
  };

  const formik = useFormik({
    initialValues: {
      phone_number: '',
      password: '',
      fullname: '',
      org: '',
      role: '',
    },
    onSubmit: values => {
      adminStore.editAdmin({
        _id: adminId,
        ...values,
        phone_number: values.phone_number?.slice(4)?.split(' ').join(''),
      })
        .finally(() => {
          handleClose();
        });
    },
  });

  const handleClose = () => {
    adminStore.setIsOpenEditAdminModal(false);
  };


  const handleEdit = () => {
  };

  const handleChange = (value: string) => {
    setEditedRole(value);
  };

  // const roleOptions = rolesStore.roles.map((role: IRole) => ({value: role?._id, label: role?.title}));

  const organisationOptions = useMemo(() => (
    (productStore.organisations && productStore.organisations.length > 0) ? (
      productStore.organisations.map((org: IOrganisation) => (
        <MenuItem key={org?._id} value={org?._id}>{org?.name_org}</MenuItem>
      ))
    ) : (
      <MenuItem value="" disabled>No Organization</MenuItem>
    )

  ), [productStore.organisations]);

  const roleOptions = rolesStore.roles.map((role: IRole) => (
    <MenuItem key={role._id} value={role._id}>
      {role.title}
    </MenuItem>
  ));


  useEffect(() => {
    rolesStore.getRoles();
    productStore.getOrganisation();
  }, []);

  return (
    <Modal
      onCancel={handleCancel}
      // onOk={}
      open={adminStore.isOpenEditAdminModal}
      title="Выберите роль"
      width={400}
    >
      <form className="form" onSubmit={formik.handleSubmit}>
        {/* <PhoneInput
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
        /> */}
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
          Add
        </Button>
      </form>
    </Modal>
  );
});
