'use client';

import { Notification as NotificationType } from '@/hooks/useNotification';
import Notification from './Notification';

interface NotificationContainerProps {
  notifications: NotificationType[];
  onRemove: (id: string) => void;
}

export default function NotificationContainer({ notifications, onRemove }: NotificationContainerProps) {
  return (
    <>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          message={notification.message}
          type={notification.type}
          onRemove={onRemove}
        />
      ))}
    </>
  );
}
