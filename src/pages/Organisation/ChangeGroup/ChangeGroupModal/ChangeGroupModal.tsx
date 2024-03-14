import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react';
import {Button, Form, Input, InputNumber} from 'antd';
import {useForm} from 'antd/es/form/Form';
import {IChangeGroupForm} from '../../../../api/organisation/types';
import {Modal} from '../../../../components/Modal';
import {organisationStore} from '../../../../store/organisation';

export const ChangeGroupModal = observer(() => {
  const [form] = useForm();
  const {t} = useTranslation();

  const handleFormFinish = (values: IChangeGroupForm) => {
    organisationStore.organisationGroupChange({
      ...values,
      org: organisationStore.singleOrganisation?._id!,
    })
      .finally(() => {
        handleClose();
      });
  };

  const handleSubmitForm = () => {
    form.submit();
  };

  const handleClose = () => {
    organisationStore.setIsOpenChangeGroupModal(false);
  };

  useEffect(() => {
    form.setFieldsValue(organisationStore.singleOrganisation);
  }, [organisationStore.singleOrganisation]);

  return (
    <Modal
      open={organisationStore.isOpenGroupChangeModal}
      onButtonClose={handleClose}
      title={`${organisationStore.singleOrganisation?.name_org} change group`}
      width={400}
      dialogActions={
        <Button
          type="primary"
          onClick={handleSubmitForm}
        >
          Save
        </Button>
      }
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFormFinish}
      >
        <Form.Item
          label={t('tableOrgName')}
          name="name_org"
        >
          <Input
            style={{width: '100%'}}
            placeholder={t('tableOrgName')}
          />
        </Form.Item>
        <Form.Item
          label={t('tableOrdGroupAId')}
          name="group_a_id"
        >
          <InputNumber
            style={{width: '100%'}}
            placeholder={t('tableOrdGroupAId')}
          />
        </Form.Item>
        <Form.Item
          label={t('tableOrdGroupBId')}
          name="group_b_id"
        >
          <InputNumber
            style={{width: '100%'}}
            placeholder={t('tableOrdGroupBId')}
          />
        </Form.Item>
        <Form.Item
          label={t('tableOrgTripTimeOut')}
          name="trip_timeout"
        >
          <InputNumber
            style={{width: '100%'}}
            placeholder={t('tableOrgTripTimeOut')}
            addonAfter="minut"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});
