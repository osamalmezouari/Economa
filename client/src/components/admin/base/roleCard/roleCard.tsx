import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { Folder } from '@mui/icons-material';
import { RoleCardProps } from './interface';
import { LiaUserEditSolid } from 'react-icons/lia';

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
}: RoleCardProps) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow border-[1px] rounded-[5px]">
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Avatar sx={{ bgcolor: getRoleColor(roleLvl) }}>
            <Folder className="text-white" />
          </Avatar>
          <div>
            <Typography variant="h6">{roleName}</Typography>
            <Typography variant="body2" color="textSecondary">
              {userTotal} members
            </Typography>
          </div>
        </div>

        {usersAvatars.length > 0 && (
          <Box className="flex -space-x-2">
            {usersAvatars.slice(0, 5).map((avatar, index) => (
              <Avatar
                key={index}
                src={avatar}
                sx={{ width: 32, height: 32, border: '2px solid white' }}
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
        >
          <LiaUserEditSolid size={20} />
          <Typography>Modify Role</Typography>
        </Button>
      </CardContent>
    </Card>
  );
};

export default RoleCard;
