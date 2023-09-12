/* eslint-disable react/function-component-definition */
import React from 'react';
import {Box, Checkbox} from '@mui/material';
import Icon from './Icon';

export default function ColorMultiPicker({colors, selected, onChangeColor, sx, ...other}: any) {
  return (
    <Box sx={sx}>
      {colors.map((color: string) => {
        const whiteColor = color === '#FFFFFF' || color === 'white';

        return (
          <Checkbox
            key={color}
            size="small"
            value={color}
            color="default"
            checked={selected.includes(color)}
            onChange={() => onChangeColor(color)}
            icon={<Icon whiteColor={whiteColor} />}
            checkedIcon={<Icon checked whiteColor={whiteColor} />}
            sx={{
              color,
              '&:hover': {opacity: 0.72},
              '& svg': {width: 12, height: 12},
            }}
            {...other}
          />
        );
      })}
    </Box>
  );
}
