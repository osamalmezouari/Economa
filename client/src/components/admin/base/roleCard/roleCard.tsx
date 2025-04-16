import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { RoleCardProps } from './interface';
import { LiaUserEditSolid } from 'react-icons/lia';
import { PiFolderUserLight } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import {
  openEditRoleDialog,
  openRightDialog,
  setRoleToEdit,
} from '../../../../features/role/roleSlice';
import { AppDispatch } from '../../../../app/store';

const getRoleColor = (level: number) => {
  switch (level) {
    case 1:
      return '#10B981'; // Emerald
    case 2:
      return '#3B82F6'; // Blue
    case 3:
      return '#F59E0B'; // Amber
    default:
      return '#6B7280'; // Gray
  }
};

const RoleCard = ({
  roleName,
  roleLvl,
  userTotal = 0,
  usersAvatars = [],
  id,
}: RoleCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleEditRole = () => {
    dispatch(openEditRoleDialog());
    dispatch(setRoleToEdit(id));
  };
  return (
    <>
      <Card className="shadow-sm border-[1px] rounded-[5px]">
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Box
                sx={{ bgcolor: getRoleColor(roleLvl) }}
                className={'p-[5px] rounded-xl'}
              >
                <PiFolderUserLight className="text-white" size={30} />
              </Box>
              <div>
                <Typography variant="h6">{roleName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {userTotal} members
                </Typography>
              </div>
            </div>
            <Button
              sx={{
                minWidth: '40px',
                width: '40px',
                height: '40px',
                padding: 0,
                color: getRoleColor(roleLvl),
                borderColor: getRoleColor(roleLvl),
                '&:hover': {
                  borderColor: getRoleColor(roleLvl),
                },
              }}
              variant="outlined"
              onClick={() => {
                dispatch(openRightDialog());
                dispatch(setRoleToEdit(id));
              }}
            >
              <Typography fontSize="24px">+</Typography>
            </Button>
          </div>

          {usersAvatars.length > 0 && (
            <Box className="flex -space-x-2">
              {usersAvatars.slice(0, 5).map((avatar, index) => (
                <Avatar
                  key={index}
                  src={avatar}
                  sx={{
                    width: 32,
                    height: 32,
                    border: '2px solid white',
                    bgcolor: 'white',
                  }}
                />
              ))}
              {userTotal > 5 && (
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: '#E5E7EB',
                    color: '#374151',
                    fontSize: '0.75rem',
                    border: '2px solid white',
                  }}
                >
                  +{userTotal - 5}
                </Avatar>
              )}
            </Box>
          )}

          <Button
            variant="outlined"
            fullWidth
            sx={{
              mt: 1,
              textTransform: 'none',
              color: getRoleColor(roleLvl),
              borderColor: getRoleColor(roleLvl),
              '&:hover': {
                borderColor: getRoleColor(roleLvl),
              },
            }}
            className="flex gap-4"
            onClick={handleEditRole}
          >
            <LiaUserEditSolid size={20} />
            <Typography className="font-Inria">Modify Role</Typography>
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default RoleCard;
