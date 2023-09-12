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
import {foodsStore} from '../../store/foods';
import UserListHead from './Head/UserListHead';
import {UserListToolbar} from './Toolbar';

const TABLE_HEAD = [
  {id: 'name', label: 'Name'},
  {id: 'product', label: 'Product'},
  {id: 'cost', label: 'Cost'},
  {id: 'category', label: 'Category'},
  {id: 'action', label: 'Action', alignRight: true},
];

export const Foods = observer(() => {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  useEffect(() => {
    foodsStore.getFoods({
      page: 1,
      size: 10,
    });
  }, []);

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Foods
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Foods
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
                headLabel={TABLE_HEAD}
                rowCount={USERLIST.length}
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {foodsStore.foods?.map((row) => {
                  const {_id, name, category, products, cost} = row;
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

                      <TableCell align="left">{name}</TableCell>
                      <TableCell align="left">{products[0]?.product?.name}</TableCell>
                      <TableCell align="left">{cost}</TableCell>
                      <TableCell align="left">
                        <Label color="success" variant={'outlined'}>
                          {sentenceCase(category)}
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

              {USERLIST?.length === 0 && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{py: 3}}>
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
            count={USERLIST.length}
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
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{mr: 2}} />
        Edit
        </MenuItem>

        <MenuItem sx={{color: 'error.main'}}>
          <Iconify icon={'eva:trash-2-outline'} sx={{mr: 2}} />
        Delete
        </MenuItem>
      </Popover>
    </>
  );
});
