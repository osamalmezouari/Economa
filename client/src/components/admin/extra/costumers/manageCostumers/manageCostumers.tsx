import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../app/store';
import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { getUsersList } from '../../../../../features/user/userThunk';
import DateCell from '../../../base/dateCell';
import { UserDetails } from '../../../../../types/user';
import {
  openUpdateUserDialog,
  setusertoEdit,
} from '../../../../../features/user/userSlice';
import { FiEdit3 } from 'react-icons/fi';

const ManageCostumersTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data } = useSelector(
    (state: RootState) => state.user.UserDetails
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearch = () => {
    dispatch(getUsersList({ page: 1, search }));
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(getUsersList({ page: currentPage, search }));
  }, [currentPage, dispatch]);

  return (
    <Box className="flex flex-col gap-6">
      <Box className="flex items-center justify-between">
        <TextField
          className="w-[250px]"
          variant="outlined"
          size="small"
          name="search"
          placeholder="Search by name or email"
          value={search}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {loading ? (
                  <CircularProgress color="primary" size={15} />
                ) : (
                  <BiSearch
                    onClick={handleSearch}
                    className="hover:bg-primary-main rounded-full w-6 h-6 border-8 bg-secondary-main text-white transition-all duration-500 ease-in-out cursor-pointer hover:text-white border-secondary-main hover:border-primary-main"
                  />
                )}
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiInputBase-input::placeholder': {
              fontSize: '12px',
            },
          }}
        />
      </Box>

      <Table>
        <TableHead className="bg-secondary-main">
          <TableRow>
            <TableCell className="py-2 h-6">ID</TableCell>
            <TableCell className="py-2 h-6">Customer</TableCell>
            <TableCell className="py-2 h-6">Balance</TableCell>
            <TableCell className="py-2 h-6">Role</TableCell>
            <TableCell className="py-2 h-6">Phone</TableCell>
            <TableCell className="py-2 h-6">Address</TableCell>
            <TableCell className="py-2 h-6">Joined Date</TableCell>
            <TableCell className="py-2 h-6"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.users.map((user: UserDetails, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell>
                <Typography className="text-[12px]">
                  {user.id.substring(0, 8)}...
                </Typography>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar src={user.avatar} sx={{ width: 40, height: 40 }} />
                  <Box>
                    <Typography
                      variant="body1"
                      className="text-[14px] font-medium"
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-[12px] text-gray-500"
                    >
                      {user.email}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-[12px]">
                  ${user.balance.Balance.toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-[12px]">
                  {user.role.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-[12px]">
                  {user.phoneNumber || 'N/A'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-[12px]">
                  {user.address || 'N/A'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-[12px]">
                  <DateCell date={user.createdAt} />
                </Typography>
              </TableCell>
              <TableCell>
                <Tooltip title={`Edit ${user.name} info`} placement="top">
                  <IconButton
                    color="secondary"
                    className="group rounded hover:bg-white hover:border-[1px] border-primary-main"
                    onClick={() => {
                      dispatch(setusertoEdit(user.id));
                      dispatch(openUpdateUserDialog());
                    }}
                  >
                    <FiEdit3
                      fontSize={'small'}
                      className="group-hover:text-primary-main"
                    />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box className="flex justify-end mt-4">
        <Pagination
          count={data.pageCount}
          color="primary"
          variant="outlined"
          page={currentPage}
          onChange={handlePageChange}
          disabled={loading}
        />
      </Box>
    </Box>
  );
};

export default ManageCostumersTable;
