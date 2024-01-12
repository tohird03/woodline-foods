/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ClickAwayListener, IconButton, Input, InputAdornment, Slide } from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from '../../../components/iconify';
import i18n from '../../../language/i18next';
import { bgBlur } from '../../../utils/cssStyles';
import { navConfig } from '../menu/constants';

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled('div')(({ theme }: any) => ({
  ...bgBlur({ color: theme.palette.background.default }),
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const storedLanguage = localStorage.getItem('lang');
  const navigate = useNavigate();

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
      const results = navConfig.filter((item: any) =>
        item.searchTitle[lang].toLowerCase().includes(query.toLowerCase()));

      setSearchItem(results);
    }
  };

  const handleEnterMenu = (menuItem: any, index: number) => {
    navigate(menuItem.path);
    handleClose();
    setHoveredIndex(index);
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
              placeholder="Search…"
              onChange={(e: any) => {
                setSearchItem(e.target.value);
                handleSearch(e.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Button variant="contained" onClick={handleClose}>
              Search
            </Button>
          </StyledSearchbar>
        </Slide>
        {(searchItem.length > 0) && (
          <div
            style={{
              width: '99%',
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: '0',
              left: '0',
              maxHeight: '350px',
              overflowY: 'auto',
              alignSelf: 'center',
              alignItems: 'center',
              zIndex: '103',
              marginTop: '100px',
              // marginRight: '20px',
              background: 'white',
              borderRadius: '10px',
              color: 'black',
              padding: '20px',
              boxShadow: '0px 4px 13.1px 0px rgba(0, 0, 0, 0.15)',
            }}
          >
            {searchItem.map((result: any, index: number) => (
              <div
                key={result.searchTitle.uz}
                style={{
                  width: '98%',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 16px',
                  height: '59px',
                  cursor: 'pointer',
                  backgroundColor: index === hoveredIndex ? 'white' : '#F3F3F3',
                  marginBottom: '5px',
                  borderRadius: '8px',
                  border: ' 1px solid #E9EAEB',
                }}
                onClick={() => handleEnterMenu(result, index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <p style={{ marginRight: '13px' }}>{result.icon}</p>
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
