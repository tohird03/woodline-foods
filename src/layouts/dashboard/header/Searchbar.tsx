/* eslint-disable react/function-component-definition */
import './searchBar.scss';

import React, {ChangeEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, ClickAwayListener, IconButton, Input, InputAdornment, Slide} from '@mui/material';
import {styled} from '@mui/material/styles';
import Iconify from '../../../components/iconify';
import i18n from '../../../language/i18next';
import {bgBlur} from '../../../utils/cssStyles';
import {INavbarLinks, navConfig} from '../menu/constants';
import { useTranslation } from 'react-i18next';

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled('div')(({theme}: any) => ({
  ...bgBlur({color: theme.palette.background.default}),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));


export default function Searchbar() {
  const [open, setOpen] = useState(false);
  const [searchItem, setSearchItem] = useState<any>([]);
  const storedLanguage = localStorage.getItem('lang');
  const navigate = useNavigate();
  const {t} = useTranslation();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
    setSearchItem([]);
  };

  const handleSearch = (query: string) => {
    const lang = i18n.language;

    if (query.trim() === '') {
      setSearchItem([]);
    } else {
      const results = navConfig.filter((item: INavbarLinks) =>
        //@ts-ignore
        item.searchTitle[lang].toLowerCase().includes(query.toLowerCase()));

      setSearchItem(results);
    }
  };


  const handleEnterMenu = (menuItem: INavbarLinks) => {
    navigate(menuItem.path);
    handleClose();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchItem(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" />
          </IconButton>
        )}

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder={t('searchText')}
              onChange={handleInputChange}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{color: 'text.disabled', width: 20, height: 20}} />
                </InputAdornment>
              }
              sx={{mr: 1, fontWeight: 'fontWeightBold'}}
            />
            <Button variant="contained" onClick={handleClose}>
              {t('searchText')}
            </Button>
          </StyledSearchbar>
        </Slide>
        {(searchItem.length > 0) && (
          <div
            className="searchedElements"
          >
            {searchItem.map((result: INavbarLinks) => (
              <div
                key={result.searchTitle.uz}
                className="searchedDiv"
                onClick={handleEnterMenu.bind(null, result)}
              >
                <p style={{marginRight: '13px'}}>{result.icon}</p>
                <p>
                  {storedLanguage === 'uz'
                    ? result.searchTitle.uz : storedLanguage === 'en'
                      ? result.searchTitle.en : result.searchTitle.ru}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}
