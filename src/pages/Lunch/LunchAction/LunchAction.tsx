/* eslint-disable react/react-in-jsx-scope */
import {useParams} from 'react-router-dom';
import {observer} from 'mobx-react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {lunchApi} from '../../../api/lunch';
import {ILunchs, ILunchsProduct} from '../../../api/lunch/types';
import {lunchStore} from '../../../store/lunch';
import {addAxiosErrorNotification, successNotification} from '../../../utils/notification';

type Props = {
  lunch: ILunchs;
};

export const LunchAction = observer(({lunch}: Props) => {
  const {id} = useParams();

  const handleLunchEdit = () => {
    lunchStore.setIsSingleEditLunch(lunch);
    lunchStore.setIsOpenEditLunchModal(true);
  };

  const handleDeleteLunchBase = () => {
    lunchApi.deleteLunch(lunch._id)
      .then(res => {
        if (res) {
          successNotification('Успех обновленных');
          lunchStore.getLunchs({});
        }
      })
      .catch(addAxiosErrorNotification);
  };

  return (
    <>
      <EditIcon style={{cursor: 'pointer'}} color="primary" onClick={handleLunchEdit} />
      <DeleteIcon style={{cursor: 'pointer', marginLeft: '10px'}} color="error" onClick={handleDeleteLunchBase} />
    </>
  );
});
