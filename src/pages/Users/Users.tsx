/* eslint-disable @typescript-eslint/naming-convention */
import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {
  Button,
  Card,
  Checkbox,
  Container,
  IconButton,
  MenuItem,
  Paper,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import {sentenceCase} from 'change-case';
import USERLIST from '../../_mock/user';
import Iconify from '../../components/iconify';
import Label from '../../components/label';
import {usersStore} from '../../store/users';
import {TABLE_HEAD} from './constants';
import UserListHead from './Head/UserListHead';
import {UsersStyles} from './styles';
import {UserListToolbar} from './Toolbar';

export const Users = observer(() => {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    usersStore.getUsers({
      page: 1,
      perPage: 10,
    });
  }, []);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event: any) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleRequestSort = (event: any, property: string) => {
    const isAsc = orderBy === property && order === 'asc';

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.id);

      setSelected(newSelecteds);

      return;
    }
    setSelected([]);
  };

  const handleRowClick = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <TableContainer sx={{minWidth: 800}}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={USERLIST.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {usersStore.users?.map((row) => {
                  const {
                    _id,
                    first_name,
                    last_name,
                    phone_number,
                    telegram_id,
                    balance,
                    is_verified,
                    org,
                  } = row;
                  const selectedUser = selected.indexOf(_id) !== -1;

                  return (
                    <TableRow
                      hover
                      key={_id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={selectedUser}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedUser}
                          onChange={handleRowClick.bind(null, _id)}
                        />
                      </TableCell>
                      <TableCell align="left">{first_name || '-'}</TableCell>
                      <TableCell align="left">{last_name || '-'}</TableCell>
                      <TableCell align="left">{telegram_id || '-'}</TableCell>
                      <TableCell align="left">{balance}</TableCell>
                      <TableCell align="left">{phone_number || '-'}</TableCell>
                      <TableCell align="left">{org?.name_org || '-'}</TableCell>
                      <TableCell align="left">
                        <Label color={is_verified ? 'success' : 'error'} variant={'outlined'}>
                          {sentenceCase(is_verified ? 'Verify' : 'Not Verify')}
                        </Label>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                          <Iconify icon={'eva:more-vertical-fill'} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>

              {usersStore.users?.length === 0 && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={9} sx={{py: 3}}>
                      <Paper
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          Not found
                        </Typography>

                        <Typography variant="body2">
                          No results found for &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Try checking for typos or using complete words.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={usersStore.users?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{vertical: 'top', horizontal: 'left'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        PaperProps={UsersStyles.sx}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={UsersStyles.mr} />
          Edit
        </MenuItem>

        <MenuItem sx={{color: 'error.main'}}>
          <Iconify icon={'eva:trash-2-outline'} sx={UsersStyles.mr} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
});
