import React, {ReactNode, SyntheticEvent, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Tab, Tabs as MUITabs} from '@mui/material';
import {Segmented, Typography} from 'antd';
import {TabsWithPanelStyles} from './styles';

export interface ITabs {
  label: string;
  tab?: ReactNode;
  labelId?: number;
  icon?: React.ReactNode;
}

export type Props = {
  tabs: ITabs[];
  activeTabIndex?: number;
  onChange?: (activeTabindex: Props['activeTabIndex']) => void;
  onTabChange?: (labelId: number) => void;
  isMobile?: boolean;
};

export const TabsWithPanel = ({tabs, activeTabIndex, onChange, onTabChange, isMobile = false}: Props) => {
  const {t} = useTranslation();
  const [activeIndex, setActiveIndex] = useState(activeTabIndex || 0);

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setActiveIndex(newValue);
    onChange?.(newValue);
  };

  const handleSegmentChange = (value: string | number) => {
    setActiveIndex(Number(value));
    onChange?.(Number(value));
    onTabChange?.(Number(value));
  };

  const handleTabClick = (id: number) => {
    onTabChange?.(id);
  };

  if (!tabs.length) {
    return null;
  }

  return (
    <>
      {!isMobile
        ? (
          <>
            <MUITabs
              value={activeIndex}
              onChange={handleChange}
              sx={TabsWithPanelStyles.tabs}
            >
              {tabs.map(({label, labelId, icon}) => (
                <Tab
                  key={label}
                  label={t(label)}
                  icon={icon! as React.ReactElement}
                  onClick={handleTabClick.bind(null, Number(labelId))}
                  iconPosition="start"
                />
              ))}
            </MUITabs>

            {tabs[activeIndex]?.tab}
          </>
        )
        : (
          <>
            <Typography.Title level={3}>
              {t(tabs[activeIndex]?.label)}
            </Typography.Title>
            {tabs[activeIndex]?.tab}

            <Segmented
              options={tabs?.map(({icon, labelId}: ITabs) => ({
                value: labelId!,
                icon,
              }))}
              size="large"
              onChange={handleSegmentChange}
              style={{
                position: 'fixed',
                bottom: '0',
                left: 0,
                right: 0,
              }}
              block
            />
          </>
        )
      }
    </>
  );
};
