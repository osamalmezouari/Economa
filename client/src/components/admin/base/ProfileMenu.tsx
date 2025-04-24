import React from 'react';
import {
  Box,
  Typography,
  Popover,
  IconButton,
  Avatar,
  Divider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { setProfileMenuOpen } from '../../../features/common/commonSlice';
import { useRouter } from '@tanstack/react-router';
import useRoleLvl from '../../../hooks/useRolelvl';
import { useAuth } from '../../../context/AuthContext';

const ProfileMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const isProfileMenuOpen = useSelector(
    (state: RootState) => state.common.isProfileMenuOpen
  );

  // Mock user data - in a real app, this would come from your auth state
  const user = useSelector(
    (state: RootState) => state.user.ShoortedUserInfo.data
  );
  const { rolelvl } = useRoleLvl();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    dispatch(setProfileMenuOpen(true));
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(setProfileMenuOpen(false));
  };

  // Import the useAuth hook
  const { logout } = useAuth();

  const handleNavigation = (path: string) => {
    if (path === '/logout') {
      logout(); // Use the logout function from AuthContext
      router.navigate({ to: '/Economa' });
    } else if (path !== '/logout') {
      router.navigate({ to: path });
    }
    handleClose();
  };

  return (
    <>
      <IconButton
        className="!bg-white !drop-shadow-sm"
        onClick={handleClick}
        sx={{ padding: '6px' }}
      >
        <Avatar sx={{ width: 40, height: 40 }} src={user.avatar} />
      </IconButton>

      <Popover
        open={isProfileMenuOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          className: 'mt-2 shadow-lg rounded-lg',
          sx: { width: 224, maxHeight: 336 },
        }}
      >
        <Box className="p-4">
          {/* User Info Section */}
          <Box className="flex items-center p-2">
            <Avatar
              src={user.avatar}
              sx={{ width: 34, height: 34 }}
              className="mr-2"
            />
            <Box>
              <Typography variant="subtitle2" className="font-semibold">
                {user.name}
              </Typography>
              <Typography variant="caption" className="text-gray-500">
                {user.email}
              </Typography>
            </Box>
          </Box>

          <Divider className="my-2" />

          {/* Navigation Options */}
          <Box className="py-1">
            <Box
              className="p-2 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleNavigation('/Economa/User/Profile')}
            >
              <Typography variant="body2">My Profile</Typography>
            </Box>
            {rolelvl < 3 ? (
              <Box
                className="p-2 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleNavigation('/Economa/admin/Dashboard')}
              >
                <Typography variant="body2">Dashboard</Typography>
              </Box>
            ) : (
              ''
            )}
          </Box>

          <Divider className="my-2" />

          {/* Sign Out Option */}
          <Box
            className="p-2 hover:bg-gray-50 cursor-pointer"
            onClick={() => handleNavigation('/logout')}
          >
            <Typography variant="body2" color="error">
              Sign Out
            </Typography>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default ProfileMenu;
