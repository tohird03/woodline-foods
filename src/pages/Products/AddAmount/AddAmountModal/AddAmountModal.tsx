import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {AdminRole} from '../../../../api/auth/types';
import {TransactionType} from '../../../../api/users/types';
import {Modal} from '../../../../components/Modal';
import {authStore} from '../../../../store/auth';
import {productStore} from '../../../../store/products';
import {productStyles} from '../../styles';

export const AddAmountModal = observer(() => {
  const isAdminStorekeeper = authStore.staffInfo?.admin?.role?.includes(AdminRole.STOREKEEPER);
  const formik = useFormik({
    initialValues: {
      amount: 0,
      type: null,
      cost: 0,
    },
    onSubmit: (values) => {
      productStore.productAmountChange({
        ...values,
        type: isAdminStorekeeper ? true : values.type === TransactionType.ADD,
        product: productStore.singleProduct?._id!,
      })
        .finally(() => {
          handleClose();
        });
    },
  });

  const handleClose = () => {
    productStore.setIsAmountModal(false);
  };

  useEffect(() => () => {
    productStore.setSingleProduct(null);
  }, []);

  return (
    <Modal
      open={productStore.isOpenAmountModal}
      onButtonClose={handleClose}
      title="Product amount change"
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          onChange={formik.handleChange}
          sx={productStyles.addBalanceTextFeild}
          inputProps={{min: 0}}
          label="Cost"
          name="cost"
          type="number"
          required
        />
        <TextField
          onChange={formik.handleChange}
          sx={productStyles.addBalanceTextFeild}
          inputProps={{min: 0}}
          label="Amount"
          name="amount"
          type="number"
          required
        />
        {!isAdminStorekeeper && (
          <FormControl sx={productStyles.addBalanceFormControl} fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              onChange={formik.handleChange}
              label="Type"
              name="type"
              value={formik.values.type}
              required
            >
              <MenuItem value={TransactionType.ADD}>Plus</MenuItem>
              <MenuItem value={TransactionType.SUBTRACT}>Minus</MenuItem>
            </Select>
          </FormControl>
        )}

        <Button
          sx={productStyles.addBalanceSubmitBtn}
          variant="contained"
          type="submit"
        >
          Change balance
        </Button>
      </form>
    </Modal>
  );
});
