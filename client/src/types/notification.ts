export interface Notification {
  id: string;
  userId?: string;
  type?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
} 

export interface NotificationState {
  getNotifications: {
    loading: boolean;
    error: string;
    data: Notification[];
  };
  markAsRead: {
    loading: boolean;
    error: string;
    data: any;
  };
}