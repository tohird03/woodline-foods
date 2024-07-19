/* eslint-disable no-extra-boolean-cast */
import React, {useEffect, useMemo, useState} from 'react';
import {observer} from 'mobx-react';
import {Button, FormControl, InputLabel, Select} from '@mui/material';
import {Select as AntSelect} from 'antd';
import {useFormik} from 'formik';
import {IOrganisation} from '../../../api/users/types';
import {Modal} from '../../../components/Modal';
import {foodsStore} from '../../../store/foods';
import {activeOptions, categoryFilterOptions} from '../constants';

export const FoodsFilter = observer(() => {
  const [orgFilter, setOrgFilter] = useState<string[]>();
  const [categoryFilter, setCategoryFilter] = useState<string[]>();
  const formik = useFormik({
    initialValues: {
      active: (
        foodsStore.filterFoods?.active === true
        || foodsStore.filterFoods?.active === false
      ) ? String(foodsStore.filterFoods?.active) : null,
    },
    onSubmit: values => {
      const isActive = String(values?.active) === 'true';

      foodsStore.setFilterFoods({
        org: orgFilter,
        category: categoryFilter,
        ...(values?.active ? {active: isActive} : {}),
      });
      handleClose();
    },
  });

  const handleOrgFilter = (value: string[]) => {
    setOrgFilter(value);
  };

  const handleCategoryFilter = (value: string[]) => {
    setCategoryFilter(value);
  };

  const handleClose = () => {
    foodsStore.setIsOpenFilterModal(false);
  };

  const handleClearFilter = () => {
    formik.resetForm();
    formik.setValues({
      active: null,
    });
    setOrgFilter([]);
    setCategoryFilter([]);
    foodsStore.setFilterFoods(null);
  };

  const organisationOptions = useMemo(() => (
    foodsStore.organisations.map((org: IOrganisation) => (
      {
        value: org?._id,
        label: org?.name_org,
      }
    ))
  ), [foodsStore.organisations]);

  useEffect(() => {
    foodsStore.getOrganisation();

    return () => {
      foodsStore.setOrganisation([]);
    };
  }, []);

  return (
    <Modal
      open={foodsStore.isOpenFilterModal}
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
          defaultValue={foodsStore.filterFoods?.org}
          onChange={handleOrgFilter}
          options={organisationOptions}
          value={orgFilter}
        />
        <AntSelect
          mode="multiple"
          allowClear
          style={{width: '100%'}}
          placeholder="Please select category"
          defaultValue={foodsStore.filterFoods?.category}
          onChange={handleCategoryFilter}
          options={categoryFilterOptions}
          value={categoryFilter}
        />
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
