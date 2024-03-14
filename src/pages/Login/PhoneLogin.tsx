import './phone-login.scss';
import 'react-phone-input-2/lib/style.css';

import React, {useState} from 'react';
import {Helmet} from 'react-helmet-async';
import PhoneInput from 'react-phone-input-2';
import {useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {Button, Container, IconButton, Typography} from '@mui/material';
import {useFormik} from 'formik';
import {useLocalStorage} from 'usehooks-ts';
import {AdminRole, ILoginResponse} from '../../api/auth/types';
import {ROUTES} from '../../constants/router';
import useResponsive from '../../hooks/useResponsive';
import {authStore} from '../../store/auth';
import {successNotification} from '../../utils/notification';
import {StyledContent, StyledRoot, StyledSection} from './styles';

export const PhoneLogin = observer(() => {
  const mdUp = useResponsive('up', 'md', 1);
  const [isShowPass, setIsShowPass] = useState(false);
  const [, setAccessToken] = useLocalStorage<string>('accessToken', '');
  const [, setStaff] = useLocalStorage<ILoginResponse | null>('staff', null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      phone_number: '',
      password: '',
    },
    onSubmit: values => {
      authStore.login({
        ...values,
        phone_number: values.phone_number?.slice(4)?.split(' ').join(''),
      })
        .then(res => {
          if (res?.token && res?.admin) {
            setAccessToken(res.token);
            setStaff(res);

            navigate(ROUTES.home);

            successNotification(`Welcome to ${res.admin?.fullname}`);
          }
        });
    },
  });

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

            <form className="form" onSubmit={formik.handleSubmit}>
              <PhoneInput
                country={'uz'}
                onChange={formik.handleChange}
                value={formik.values.phone_number}
                inputProps={{
                  name: 'phone_number',
                  required: true,
                  autoFocus: true,
                  onChange: formik.handleChange,
                  className: 'form__password-input form__phone-input',
                  autocomplete: 'off',
                }}
              />
              <div className="form__password-wrapper">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  minLength={8}
                  className="form__password-input"
                  type={isShowPass ? 'text' : 'password'}
                  placeholder="Password"
                  name="password"
                  required
                />
                <IconButton
                  onClick={handleShowPass}
                  className="form__pass-icon"
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
                type="submit"
              >
                Login
              </Button>
            </form>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
});
