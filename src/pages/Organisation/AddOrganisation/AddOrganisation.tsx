import React from 'react';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react';
import {Button, TextField} from '@mui/material';
import {Form, InputNumber} from 'antd';
import {useFormik} from 'formik';
import {Modal} from '../../../components/Modal';
import {organisationStore} from '../../../store/organisation';
import {MODAL_WIDTH} from '../constants';
import {organisationStyles} from '../styles';

export const AddOrganisation = observer(() => {
  const {t} = useTranslation();

  const formik = useFormik({
    initialValues: {
      name_org: '',
      group_a_id: '',
      group_b_id: '',
      trip_timeout: '',
    },
    onSubmit: values => {
      const orgData = {
        name_org: values.name_org,
        group_a_id: Number(values.group_a_id),
        group_b_id: Number(values.group_b_id),
        trip_timeout: Number(values.trip_timeout),
      };

      organisationStore.addOrganisation(orgData)
        .finally(() => {
          handleClose();
        });
    },
  });

  const handleInputChange = (value: any, fieldName: any) => {
    formik.setFieldValue(fieldName, value);
  };

  const handleClose = () => {
    organisationStore.setIsOpenAddOrganisation(false);
  };

  return (
    <Modal
      open={organisationStore.isOpenAddOrganisation}
      onButtonClose={handleClose}
      title="Add new organisation"
      width={MODAL_WIDTH}
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          style={{marginTop: '5px'}}
          sx={organisationStyles.addOrganisationTextFeild}
          onChange={formik.handleChange}
          value={formik.values.name_org}
          placeholder="New Organisation name"
          name="name_org"
          required
        />
        <Form.Item
          name="group_a_id"
        >
          <InputNumber
            value={formik.values.group_a_id}
            onChange={(value) => handleInputChange(value, 'group_a_id')}
            style={{width: '100%'}}
            placeholder={t('tableOrdGroupAId')}
          />
        </Form.Item>
        <Form.Item
          name="group_b_id"
        >
          <InputNumber
            value={formik.values.group_b_id}
            onChange={(value) => handleInputChange(value, 'group_b_id')}
            style={{width: '100%'}}
            placeholder={t('tableOrdGroupBId')}
          />
        </Form.Item>
        <Form.Item
          name="trip_timeout"
        >
          <InputNumber
            value={formik.values.trip_timeout}
            onChange={(value) => handleInputChange(value, 'trip_timeout')}
            style={{width: '100%'}}
            placeholder={t('tableOrgTripTimeOut')}
            addonAfter="minut"
          />
        </Form.Item>

        <Button
          sx={organisationStyles.addOrganisationSubmitButton}
          variant="contained"
          type="submit"
        >
          Add
        </Button>
      </form>
    </Modal>
  );
});
