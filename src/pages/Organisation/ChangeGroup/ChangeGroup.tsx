import React from 'react';
import {observer} from 'mobx-react';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import {IconButton} from '@mui/material';
import {IOrganisation} from '../../../api/organisation/types';
import {organisationStore} from '../../../store/organisation';

type Props = {
  organisation: IOrganisation;
};

export const ChangeGroup = observer(({organisation}: Props) => {

  const handleChangeGroup = () => {
    organisationStore.setSingleOrganisation(organisation);
    organisationStore.setIsOpenChangeGroupModal(true);
  };

  return (
    <IconButton onClick={handleChangeGroup}>
      <SettingsSuggestIcon />
    </IconButton>
  );
});
