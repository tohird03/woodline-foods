import React, {ReactNode, SyntheticEvent, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Tab, Tabs as MUITabs} from '@mui/material';
import {TabsWithPanelStyles} from './styles';

export type Props = {
  tabs: {
    label: string;
    tab?: ReactNode;
    labelId?: number;
  }[];
  activeTabIndex?: number;
  onChange?: (activeTabindex: Props['activeTabIndex']) => void;
  onTabChange?: (labelId: number) => void;
};

export const TabsWithPanel = ({tabs, activeTabIndex, onChange, onTabChange}: Props) => {
  const {t} = useTranslation();
  const [activeIndex, setActiveIndex] = useState(activeTabIndex || 0);

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setActiveIndex(newValue);
    onChange?.(newValue);
  };

  const handleTabClick = (id: number) => {
    onTabChange?.(id);
  };

  if (!tabs.length) {
    return null;
  }

  return (
    <>
      <MUITabs
        value={activeIndex}
        onChange={handleChange}
        sx={TabsWithPanelStyles.tabs}
      >
        {tabs.map(({label, labelId}) => (
          <Tab
            key={label}
            label={t(label)}
            onClick={handleTabClick.bind(null, Number(labelId))}
          />
        ))}
      </MUITabs>

      {tabs[activeIndex]?.tab}
    </>
  );
};
