/* eslint-disable react/react-in-jsx-scope */
import {useParams} from 'react-router-dom';
import {observer} from 'mobx-react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {lunchApi} from '../../../api/lunch';
import {ILunchsProduct} from '../../../api/lunch/types';
import {lunchStore} from '../../../store/lunch';
import {addAxiosErrorNotification, successNotification} from '../../../utils/notification';

type Props = {
  lunch: ILunchsProduct;
};

export const AddLunch = observer(({lunch}: Props) => {
  const {id} = useParams();
  const handleOpenAddLunchModal = () => {
    lunchStore.setIsOpenLunchBaseModal(true);
    lunchStore.setSingleLunch(lunch);
  };

  const handleDeleteLunchBase = () => {
    lunchApi.deleteLunchBase(lunch._id)
      .then(res => {
        if (res) {
          successNotification('Успех обновленных');
          lunchStore.getLunchBases({
            lunchbase: id!,
          });
        }
      })
      .catch(addAxiosErrorNotification);

  };

  return (
    <>
      <EditIcon style={{cursor: 'pointer'}} color="primary" onClick={handleOpenAddLunchModal} />
      <DeleteIcon style={{cursor: 'pointer', marginLeft: '10px'}} color="error" onClick={handleDeleteLunchBase} />
    </>
  );
});
