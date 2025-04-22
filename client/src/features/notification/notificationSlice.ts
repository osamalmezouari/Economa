import { createSlice } from '@reduxjs/toolkit';
import { NotificationState } from '../../types/notification';
import { getNotificationList, markNotificationAsRead } from './notificationThunk';

const initialState: NotificationState = {
  getNotifications: {
    loading: false,
    error: '',
    data: [],
  },
  markAsRead: {
    loading: false,
    error: '',
    data: null,
  },
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get notifications list
    builder
      .addCase(getNotificationList.pending, (state) => {
        state.getNotifications.loading = true;
        state.getNotifications.error = '';
      })
      .addCase(getNotificationList.fulfilled, (state, action) => {
        state.getNotifications.loading = false;
        state.getNotifications.data = action.payload;
      })
      .addCase(getNotificationList.rejected, (state, action) => {
        state.getNotifications.loading = false;
        state.getNotifications.error = action.payload as string;
      })
      // Mark notification as read
      .addCase(markNotificationAsRead.pending, (state) => {
        state.markAsRead.loading = true;
        state.markAsRead.error = '';
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        state.markAsRead.loading = false;
        state.markAsRead.data = action.payload;
        // Update the notification in the list
        const updatedNotification = action.payload;
        state.getNotifications.data = state.getNotifications.data.map((notification) =>
          notification.id === updatedNotification.id ? updatedNotification : notification
        );
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.markAsRead.loading = false;
        state.markAsRead.error = action.payload as string;
      });
  },
});

export const notificationReducer = notificationSlice.reducer;
export default notificationSlice.reducer;