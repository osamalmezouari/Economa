import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  Popover,
  IconButton,
  Badge,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { setNotificationOpen } from '../../../features/common/commonSlice';
import RingBellSolidIcon from '../../icons/ring-bell-solid';
import {
  getNotificationList,
  markNotificationAsRead,
} from '../../../features/notification/notificationThunk';
import { Notification } from '../../../types/notification';
import { formatDistanceToNow } from 'date-fns';
import io from 'socket.io-client';
import { getShoortedUserInfo } from '../../../features/user/userThunk';

const getNotificationIcon = (type: string | undefined) => {
  switch (type) {
    case 'order':
      return <Box className="p-2 bg-gray-100 rounded-md">🛒</Box>;
    case 'system':
      return <Box className="p-2 bg-gray-100 rounded-md">🔧</Box>;
    case 'payment':
      return <Box className="p-2 bg-gray-100 rounded-md">💳</Box>;
    case 'product':
      return <Box className="p-2 bg-gray-100 rounded-md">📦</Box>;
    case 'user':
      return <Box className="p-2 bg-gray-100 rounded-md">👤</Box>;
    case 'Refill Request':
      return <Box className="p-2 bg-gray-100 rounded-md">⏳</Box>;
  }
};

const NotificationBellIcon: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const isNotificationOpen = useSelector(
    (state: RootState) => state.common.isNotificationOpen
  );
  const { data: notifications, loading } = useSelector(
    (state: RootState) => state.notification.getNotifications
  );
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    dispatch(getShoortedUserInfo());
  }, [dispatch]);

  useEffect(() => {
    const newSocket = io(
      import.meta.env.VITE_API_URL || 'http://localhost:3000'
    );
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('new_notification', (notification: Notification) => {
      dispatch(getNotificationList());
    });

    return () => {
      socket.off('new_notification');
    };
  }, [socket, dispatch]);

  useEffect(() => {
    dispatch(getNotificationList());
  }, [dispatch]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    dispatch(setNotificationOpen(true));
    dispatch(getNotificationList());
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(setNotificationOpen(false));
  };

  const handleMarkAsRead = (id: string) => {
    dispatch(markNotificationAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    notifications
      .filter((notification) => !notification.isRead)
      .forEach((notification) => {
        dispatch(markNotificationAsRead(notification.id));
      });
  };

  return (
    <>
      <IconButton
        className="group !rounded !bg-white !drop-shadow-sm"
        onClick={handleClick}
      >
        <Badge
          badgeContent={unreadCount > 0 ? '' : undefined}
          color="warning"
          variant={unreadCount > 0 ? 'dot' : undefined}
          sx={{
            '& .MuiBadge-badge': {
              minWidth: '10px',
              height: '10px',
              padding: 0,
              borderRadius: '50%',
              backgroundColor: unreadCount > 0 ? '#FFD700' : undefined, // Bright yellow color
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
                sx={{
                  '& .MuiFormControlLabel-label': { fontSize: '0.875rem' },
                }}
                inputProps={{ 'aria-label': 'Mark all as read' }}
              />
              <Typography variant="body2" className="text-gray-500 text-sm">
                Mark all as read
              </Typography>
            </Box>
          </Box>

          <Box className="overflow-y-auto max-h-[350px]">
            {loading ? (
              <Box className="flex justify-center items-center p-4">
                <CircularProgress size={24} />
              </Box>
            ) : notifications.length === 0 ? (
              <Box className="p-4 text-center">
                <Typography variant="body2" className="text-gray-500">
                  No notifications yet
                </Typography>
              </Box>
            ) : (
              notifications.map((notification: Notification) => (
                <Box
                  key={notification.id}
                  className={`flex items-start p-3 hover:bg-gray-50 ${!notification.isRead ? 'border-l-4 border-primary-main' : ''}`}
                  onClick={() =>
                    !notification.isRead && handleMarkAsRead(notification.id)
                  }
                >
                  <Box className="mr-3">
                    {getNotificationIcon(notification.type)}
                  </Box>
                  <Box className="flex-1">
                    <Typography variant="body2" className="font-medium">
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      {notification.createdAt
                        ? formatDistanceToNow(
                            new Date(notification.createdAt),
                            { addSuffix: true }
                          )
                        : 'recently'}
                    </Typography>
                  </Box>
                  {!notification.isRead && (
                    <Box className="w-2 h-2 rounded-full bg-primary-main mt-2" />
                  )}
                </Box>
              ))
            )}
          </Box>

          <Box className="mt-3 text-center border-t pt-2">
            <Typography
              variant="body2"
              className="text-primary-main cursor-pointer font-medium"
            >
              {notifications.length} notifications
            </Typography>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default NotificationBellIcon;
