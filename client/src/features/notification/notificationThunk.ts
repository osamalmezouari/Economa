import { createAsyncThunk } from '@reduxjs/toolkit';
import * as notificationApi from '../../api/notifications';

/**
 * Async thunk to fetch all notifications
 */
export const getNotificationList = createAsyncThunk(
  'notification/getNotificationList',
  async (_, { rejectWithValue }) => {
    try {
      return await notificationApi.getNotificationList();
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue({
        message: error.message || 'Failed to fetch notifications',
      });
    }
  }
);

/**
 * Async thunk to mark a notification as read
 */
export const markNotificationAsRead = createAsyncThunk(
  'notification/markAsRead',
  async (id: string, { rejectWithValue }) => {
    try {
      return await notificationApi.markNotificationAsRead(id);
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error);
      }
      return rejectWithValue({
        message: error.message || 'Failed to mark notification as read',
      });
    }
  }
);