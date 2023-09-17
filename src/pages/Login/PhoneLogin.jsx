import './phone-login.scss';
import 'react-phone-input-2/lib/style.css';

import React, {useState} from 'react';
import {Helmet} from 'react-helmet-async';
import PhoneInput from 'react-phone-input-2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {Button, Container, IconButton, Typography} from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import {StyledContent, StyledRoot, StyledSection} from './styles';

export const PhoneLogin = () => {
  const mdUp = useResponsive('up', 'md');
  const [isShowPass, setIsShowPass] = useState(false);

  const [phone, setPhone] = useState('');

  const handlePhoneChange = (phone) => {
    setPhone(phone);
  };

  const handleSubmitPhone = (evt) => {
    if (evt) {
      evt.preventDefault();
    }
  };

  const handleShowPass = () => {
    setIsShowPass(!isShowPass);
  };

  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{px: 5, mt: 10, mb: 5}}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="xs">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to Woodline Food
            </Typography>

            <form className="form" onSubmit={handleSubmitPhone}>
              <PhoneInput
                country={'uz'}
                value={phone}
                onChange={handlePhoneChange}
                inputProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: true,
                }}
                className="form__phone"
              />
              <div className="form__password-wrapper">
                <input
                  className="form__password-input"
                  type={isShowPass ? 'text' : 'password'}
                  placeholder="Password"
                  minLength={8}
                />
                <IconButton
                  className="form__pass-icon"
                  onClick={handleShowPass}
                  size="small"
                >
                  {isShowPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </div>
              <Button
                size="small"
                variant="contained"
                color="primary"
                className="form__otp-submit"
              >
                Login
              </Button>
            </form>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
};
