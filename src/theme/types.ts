import {Theme} from '@mui/material/styles';

export interface CustomTheme extends Theme {
  customShadows: {
    z20: string;
  };
}
