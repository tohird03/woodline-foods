import {Breakpoint, useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function useResponsive(
  query: string,
  start: Breakpoint | number,
  end: Breakpoint | number
) {
  const theme = useTheme();
  const mediaQuery = useMediaQuery(
    query === 'up' ? theme.breakpoints.up(start)
      : query === 'down' ? theme.breakpoints.down(start)
        : query === 'between' ? theme.breakpoints.between(start, end)
          : theme.breakpoints.only(start as Breakpoint)
  );

  return mediaQuery;
}

export function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();

  return keys || 'xs';
}
