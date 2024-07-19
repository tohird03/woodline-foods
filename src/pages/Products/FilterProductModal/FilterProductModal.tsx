import React, {useEffect, useMemo, useState} from 'react';
import {observer} from 'mobx-react';
import {Button} from '@mui/material';
import {DatePicker, Select as AntSelect} from 'antd';
import {useFormik} from 'formik';
import {IOrganisation} from '../../../api/users/types';
import {Modal} from '../../../components/Modal';
import {productStore} from '../../../store/products';


export const FilterProductModal = observer(() => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [orgFilter, setOrgFilter] = useState<string[]>();

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      productStore.setFilterProducts({
        org: orgFilter!,
        startDate: startDate!,
        endDate: endDate!,
      });
      handleClose();
    },
  });

  const handleOrgFilter = (value: string[]) => {
    setOrgFilter(value);
  };

  const handleDateChange = (values: any, formatString: [string, string]) => {
    setStartDate(formatString[0] || null);
    setEndDate(formatString[1] || null);
  };

  const handleClose = () => {
    productStore.setIsOpenFilterModal(false);
  };

  const handleClearFilter = () => {
    formik.resetForm();
    formik.setValues({
      org: null,
    });
    setStartDate(null);
    setEndDate(null);
    productStore.setFilterProducts(null);
  };

  const organisationOptions = useMemo(() => (
    productStore.organisations.map((org: IOrganisation) => (
      {
        value: org?._id,
        label: org?.name_org,
      }
    ))

  ), [productStore.organisations]);

  useEffect(() => {
    productStore.getOrganisation();

    return () => {
      productStore.setOrganisation([]);
    };
  }, []);

  return (
    <Modal
      open={productStore.isOpenFilterModal}
      onButtonClose={handleClose}
      title="Change balance"
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
          defaultValue={productStore.filterProducts?.org}
          onChange={handleOrgFilter}
          options={organisationOptions}
          value={orgFilter}
        />

        <DatePicker.RangePicker
          onChange={handleDateChange}
          style={{width: '100%'}}
        />
        <div style={{display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'space-between'}}>
          <Button
            variant="contained"
            type="button"
            onClick={handleClearFilter}
            color="error"
          >
            Clear
          </Button>
          <Button
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
