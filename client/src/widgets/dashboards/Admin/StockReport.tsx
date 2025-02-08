import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const StockReport = () => {
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Bob', email: 'bob@example.com' },
    { id: 4, name: 'Bob', email: 'bob@example.com' },
    { id: 5, name: 'Bob', email: 'bob@example.com' },
    { id: 6, name: 'Bob', email: 'bob@example.com' },
  ];
  return (
    <Card className="mt-6 mb-6 rounded-[5px] border-[1px] shadow-none px-4">
      <CardHeader
        className="h-24 p-0"
        title={<Typography variant="h5">Stock Report</Typography>}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="w-20">ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="hover:bg-gray-50 transform transition-all duration-300"
            >
              <TableCell>{user.id}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Avatar
                  className="rounded-[1px] w-50 h-50"
                  sx={{ width: '55px', height: '55px' }}
                />
                <Box>
                  <Typography
                    variant="body1"
                    className="font-main text-[14px] capitalize"
                  >
                    sweet peppers
                  </Typography>
                  <Typography
                    variant="body2"
                    className="font-main text-[12px] text-secondary-light capitalize"
                  >
                    fast food
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
export default StockReport;
