/* eslint-disable react/react-in-jsx-scope */
import {observer} from 'mobx-react';
import EditIcon from '@mui/icons-material/Edit';
import {ILunchsProduct} from '../../../api/lunch/types';
import {lunchStore} from '../../../store/lunch';

type Props = {
  lunch: ILunchsProduct;
};

export const AddLunch = observer(({lunch}: Props) => {
  const handleOpenAddLunchModal = () => {
    lunchStore.setIsOpenLunchBaseModal(true);
    lunchStore.setSingleLunch(lunch);
  };

  return (
    <EditIcon style={{cursor: 'pointer'}} onClick={handleOpenAddLunchModal} />
  );
});
