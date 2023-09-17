import React, {useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {FilterTime} from '../../../api/dashboard/types';
import {IOrganisation} from '../../../api/products/types';
import {dashboardStore} from '../../../store/dashboard';
import {productStore} from '../../../store/products';
import {dashboardStyles} from '../styles';

export const Filter = observer(() => {
  const {t} = useTranslation();

  const handleOrgChange = (event: SelectChangeEvent<string>) => {
    dashboardStore.setOrg(event.target.value);
  };

  const handleTimeChange = (event: SelectChangeEvent<string>) => {
    dashboardStore.setTime(event.target.value as FilterTime);
  };

  const orgOptions = useMemo(() => (
    [
      <MenuItem key={'all'} value={'all'}>All</MenuItem>,
      ...(productStore.organisations.map((org: IOrganisation) => (
        <MenuItem key={org?._id} value={org?._id}>{org?.name_org}</MenuItem>
      ))),
    ]
  ), [productStore.organisations]);

  const timeOptions = useMemo(() => ([
    <MenuItem key={FilterTime.DAY} value={FilterTime.DAY}>{FilterTime.DAY}</MenuItem>,
    <MenuItem key={FilterTime.WEEK} value={FilterTime.WEEK}>{FilterTime.WEEK}</MenuItem>,
    <MenuItem key={FilterTime.MONTH} value={FilterTime.MONTH}>{FilterTime.MONTH}</MenuItem>,
    <MenuItem key={FilterTime.YEAR} value={FilterTime.YEAR}>{FilterTime.YEAR}</MenuItem>,
  ]), []);

  useEffect(() => {
    productStore.getOrganisation();
  }, []);

  return (
    <Box sx={dashboardStyles.filterWrapper}>
      <FormControl sx={dashboardStyles.filterOrgControl} fullWidth>
        <InputLabel>{t('dashboardFilterOrg')}</InputLabel>
        <Select label={t('dashboardFilterOrg')} onChange={handleOrgChange}>
          {orgOptions}
        </Select>
      </FormControl>
      <FormControl sx={dashboardStyles.filterOrgControl} fullWidth>
        <InputLabel>{t('dashboardFilterByTime')}</InputLabel>
        <Select label={t('dashboardFilterByTime')} onChange={handleTimeChange}>
          {timeOptions}
        </Select>
      </FormControl>
    </Box>
  );
});
