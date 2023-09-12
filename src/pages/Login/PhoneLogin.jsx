import './phone-login.scss';
import 'react-phone-input-2/lib/style.css';

import React, {useState} from 'react';
import {Helmet} from 'react-helmet-async';
import PhoneInput from 'react-phone-input-2';
import OtpInput from 'react18-input-otp';
import RefreshIcon from '@mui/icons-material/Refresh';
import {Button, Container, Typography} from '@mui/material';
import Timer from 'otp-timer';
import useResponsive from '../../hooks/useResponsive';
import {StyledContent, StyledRoot, StyledSection} from './styles';

export const PhoneLogin = () => {
  const mdUp = useResponsive('up', 'md');

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isSendSms, setIsSendSms] = useState(false);

  const handlePhoneChange = (phone) => {
    setPhone(phone);
  };

  const handleSubmitPhone = (evt) => {
    if (evt) {
      evt.preventDefault();
    }
  };

  const handleChangeOtp = (otp) => {
    setOtp(otp);
  };

  const handleClick = () => {
    // TODO
  };

  const handleSendSms = () => {
    setIsSendSms(true);
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
              <div className="form__otp-wrapper">
                <OtpInput
                  value={otp}
                  onChange={handleChangeOtp}
                  numInputs={6}
                  className="form__otp"
                  inputType="number"
                  type="number"
                />
                {isSendSms
                  ? (
                    <div className="form__otp-timer">
                      <Timer
                        seconds={59}
                        minutes={2}
                        resend={handleClick}
                        text={' '}
                        textColor="#000"
                        background="#cacaca"
                        buttonColor="#000"
                        ButtonText={
                          <>Repeat <RefreshIcon /></>
                        }
                      />
                    </div>
                  )
                  : (
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      className="form__otp-submit"
                      onClick={handleSendSms}
                    >
                      Get Code
                    </Button>
                  )

                }
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
