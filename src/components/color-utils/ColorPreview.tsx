import React from 'react';
import {Box, Stack, Typography} from '@mui/material';
import {alpha} from '@mui/material/styles';

// eslint-disable-next-line react/function-component-definition
export default function ColorPreview({colors, limit = 3, sx}: any) {
  const showColor = colors.slice(0, limit);

  const moreColor = colors.length - limit;

  return (
    <Stack component="span" direction="row" alignItems="center" justifyContent="flex-end" sx={sx}>
      {showColor.map((color: string, index: number) => (
        <Box
          key={color + index}
          sx={{
            ml: -0.75,
            width: 16,
            height: 16,
            borderRadius: '50%',
            border: (theme) => `solid 2px ${theme.palette.background.paper}`,
            boxShadow: (theme) => `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`,
            bgcolor: color,
          }}
        />
      ))}

      {colors.length > limit && <Typography variant="subtitle2">{`+${moreColor}`}</Typography>}
    </Stack>
  );
}
