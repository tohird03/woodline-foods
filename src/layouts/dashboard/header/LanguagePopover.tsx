/* eslint-disable react/function-component-definition */
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Box, IconButton, MenuItem, Popover, Stack, Tooltip} from '@mui/material';
import {alpha} from '@mui/material/styles';
import i18n from '../../../language/i18next';

enum LangValue {
  Uz = 'uz',
  Ru = 'ru',
  Eng = 'en',
}

interface ILangs {
  value: LangValue;
  label: string;
  icon: string;
}

const LANGS: Record<LangValue, ILangs> = {
  [LangValue.Uz]: {
    value: LangValue.Uz,
    label: 'Uz',
    icon: '/assets/icons/uzbekistan.png',
  },
  [LangValue.Ru]: {
    value: LangValue.Ru,
    label: 'Рус',
    icon: '/assets/icons/russia.png',
  },
  [LangValue.Eng]: {
    value: LangValue.Eng,
    label: 'Eng',
    icon: '/assets/icons/english.png',
  },
};

export default function LanguagePopover() {
  const [open, setOpen] = useState(null);
  const storedLanguage = localStorage.getItem('lang');
  const [language, setLanguage] = useState<LangValue>(storedLanguage as LangValue || LangValue.Ru);
  const {t} = useTranslation();

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleOptionClick = (value: LangValue) => {
    setLanguage(value);
    i18n.changeLanguage(value);
    handleClose();
  };

  return (
    <>
      <Tooltip title={t('tooltipLanguageSelect')}>
        <IconButton
          onClick={handleOpen}
          sx={{
            padding: 0,
            width: 44,
            height: 44,
            ...(open ? {
              bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
            } : {}
            ),
          }}
        >
          <img width="28" src={LANGS[language].icon} alt={LANGS[language].label} />
        </IconButton>
      </Tooltip>


      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {Object.values(LANGS).map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === language}
              onClick={handleOptionClick.bind(null, option.value)}
            >
              <Box
                component="img"
                alt={option.label}
                src={option.icon}
                sx={{width: 28, mr: 2}}
              />
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
