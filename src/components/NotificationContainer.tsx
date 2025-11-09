'use client';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface NotificationContainerProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

export default function NotificationContainer({ notifications, onRemove }: NotificationContainerProps) {
  if (notifications.length === 0) return null;

  const getNotificationStyle = (type: string) => {
    const baseStyle = 'fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm animate-slide-in';
    
    switch (type) {
      case 'success':
        return `${baseStyle} bg-green-500 text-white`;
      case 'error':
        return `${baseStyle} bg-red-500 text-white`;
      case 'warning':
        return `${baseStyle} bg-yellow-500 text-white`;
      case 'info':
      default:
        return `${baseStyle} bg-blue-500 text-white`;
    }
  };

  return (
    <div className="notification-container">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className={getNotificationStyle(notification.type)}
          style={{ top: `${1 + index * 5}rem` }}
        >
          <div className="flex items-center justify-between">
            <span>{notification.message}</span>
            <button
              onClick={() => onRemove(notification.id)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
