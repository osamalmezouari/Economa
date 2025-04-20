import React from 'react';
import { Box, Typography, Checkbox, Popover, IconButton, Badge } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { setNotificationOpen } from '../../../features/common/commonSlice';
import RingBellSolidIcon from '../../icons/ring-bell-solid';

// Mock notification data
interface Notification {
  id: string;
  icon: React.ReactNode;
  message: string;
  time: string;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    icon: <Box className="p-2 bg-gray-100 rounded-md">🛠️</Box>,
    message: 'Invitation for crafting engaging designs',
    time: '2 years',
    isRead: false,
  },
  {
    id: '2',
    icon: <Box className="p-2 bg-gray-100 rounded-md">📊</Box>,
    message: 'Isomorphic dashboard redesign',
    time: '2 years',
    isRead: false,
  },
  {
    id: '3',
    icon: <Box className="p-2 bg-gray-100 rounded-md">📁</Box>,
    message: '3 New Incoming Project Files:',
    time: '2 years',
    isRead: true,
  },
  {
    id: '4',
    icon: <Box className="p-2 bg-gray-100 rounded-md">🛍️</Box>,
    message: 'Swornak purchased isomorphic',
    time: '2 years',
    isRead: true,
  },
  {
    id: '5',
    icon: <Box className="p-2 bg-gray-100 rounded-md">🔄</Box>,
    message: 'Task #45890 merged with #45890 in "A..."',
    time: '2 years',
    isRead: false,
  },
  {
    id: '6',
    icon: <Box className="p-2 bg-gray-100 rounded-md">💡</Box>,
    message: '3 new application design concepts added',
    time: '2 years',
    isRead: false,
  },
  {
    id: '7',
    icon: <Box className="p-2 bg-gray-100 rounded-md">📦</Box>,
    message: 'Your order has been placed',
    time: '2 years',
    isRead: true,
  },
];

const NotificationBellIcon: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const isNotificationOpen = useSelector((state: RootState) => state.common.isNotificationOpen);
  const unreadCount = mockNotifications.filter(notification => !notification.isRead).length;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    dispatch(setNotificationOpen(true));
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(setNotificationOpen(false));
  };

  const handleMarkAllAsRead = () => {
    // In a real application, this would dispatch an action to mark all notifications as read
    console.log('Mark all as read');
  };

  return (
    <>
      <IconButton className="group !rounded !bg-white !drop-shadow-sm" onClick={handleClick}>
        <Badge
          badgeContent={unreadCount > 0 ? '' : undefined}
          color="warning"
          className=""
          sx={{
            '& .MuiBadge-badge': {
              minWidth: '10px',
              height: '10px',
              padding: 0,
              borderRadius: '50%',
              border: '2px solid white',
              right: '2px',
              top: '4px',
            },
          }}
        >
          <RingBellSolidIcon className="h-[20px] text-black w-auto group-hover:text-primary-main transition-all" />
        </Badge>
      </IconButton>

      <Popover
        open={isNotificationOpen}
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
          sx: { width: 380, maxHeight: 480 },
        }}
      >
        <Box className="p-4">
          <Box className="flex justify-between items-center mb-4">
            <Typography variant="h6" className="font-semibold">
              Notifications
            </Typography>
            <Box className={'flex items-center'}>
            <Checkbox
              size="small"
              onChange={handleMarkAllAsRead}
              className="text-sm"
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
              inputProps={{ 'aria-label': 'Mark all as read' }}
            />
            <Typography variant="body2" className="text-gray-500 text-sm">
              Mark all as read
            </Typography>    
            </Box>
            
          </Box>

          <Box className="overflow-y-auto max-h-[350px]">
            {mockNotifications.map((notification) => (
              <Box
                key={notification.id}
                className={`flex items-start p-3 hover:bg-gray-50 ${!notification.isRead ? 'border-l-4 border-primary-main' : ''}`}
              >
                <Box className="mr-3">{notification.icon}</Box>
                <Box className="flex-1">
                  <Typography variant="body2" className="font-medium">
                    {notification.message}
                  </Typography>
                  <Typography variant="caption" className="text-gray-500">
                    {notification.time}
                  </Typography>
                </Box>
                {!notification.isRead && (
                  <Box className="w-2 h-2 rounded-full bg-primary-main mt-2" />
                )}
              </Box>
            ))}
          </Box>

          <Box className="mt-3 text-center border-t pt-2">
            <Typography
              variant="body2"
              className="text-primary-main hover:underline cursor-pointer font-medium"
            >
              View All Activity
            </Typography>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default NotificationBellIcon;