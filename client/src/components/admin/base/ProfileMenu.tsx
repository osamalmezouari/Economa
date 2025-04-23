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

const ProfileMenu = () => {
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    dispatch(setProfileMenuOpen(true));
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(setProfileMenuOpen(false));
  };

  const handleNavigation = (path: string) => {
    // Handle navigation - in a real app, this would use your router
    console.log(`Navigate to: ${path}`);
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
              onClick={() => handleNavigation('/profile')}
            >
              <Typography variant="body2">My Profile</Typography>
            </Box>
            <Box
              className="p-2 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleNavigation('/settings')}
            >
              <Typography variant="body2">Account Settings</Typography>
            </Box>
            <Box
              className="p-2 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleNavigation('/activity')}
            >
              <Typography variant="body2">Activity Log</Typography>
            </Box>
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
