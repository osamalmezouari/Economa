import { Notification } from '../types/notification';
import { apiClient } from '../utils/apiClient';

/**
 * Fetches all notifications for the current user
 * @returns Promise with notification data
 */
export const getNotificationList = async (): Promise<Notification[]> => {
  try {
    const response = await apiClient.get('/notifications');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to fetch notifications');
  }
};

export const markNotificationAsRead = async (
  id: string
): Promise<Notification> => {
  try {
    const response = await apiClient.patch(`/notifications/${id}`, {
      isRead: true,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw new Error('Failed to mark notification as read');
  }
};
