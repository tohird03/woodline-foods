import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {observer} from 'mobx-react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import {Button} from 'antd';
import {IOrganisation} from '../../../api/foods/types';
import {organisationApi} from '../../../api/organisation';
import {organisationStore} from '../../../store/organisation';
import {addAxiosErrorNotification, successNotification} from '../../../utils/notification';

type Props = {
  org: IOrganisation;
};

export const OrganizationAction = observer(({org}: Props) => {
  const handleDeleteOrgProduct = () => {
    organisationApi.deleteOrganization(org._id)
      .then(res => {
        if (res) {
          successNotification('Успех обновленных');
          organisationStore.getOrganisation({});
        }
      })
      .catch(addAxiosErrorNotification);
  };

  return (
    <div>
      <Button onClick={handleDeleteOrgProduct} icon={<DeleteIcon color="error" />} />
    </div>
  );
});
