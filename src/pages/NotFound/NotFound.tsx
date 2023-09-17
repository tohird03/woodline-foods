import React from 'react';
import {Helmet} from 'react-helmet-async';
import {Link as RouterLink} from 'react-router-dom';
import {Box, Button, Container, Typography} from '@mui/material';
import {notFoundStyles, StyledContent} from './styles';

export const NotFound = () => (
  <>
    <Helmet>
      <title> 404 Page Not Found | Minimal UI </title>
    </Helmet>

    <Container>
      <StyledContent>
        <Typography variant="h3" paragraph>
            Sorry, page not found!
        </Typography>

        <Typography sx={notFoundStyles.heading}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your
            spelling.
        </Typography>

        <Box
          component="img"
          src="/assets/illustrations/illustration_404.svg"
          sx={notFoundStyles.imgWrappper}
        />

        <Button
          to="/"
          size="large"
          variant="contained"
          component={RouterLink}
        >
            Go to Home
        </Button>
      </StyledContent>
    </Container>
  </>
);
