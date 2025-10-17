'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

interface NotificationProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onRemove: (id: string) => void;
}

const getNotificationIcon = (type: string) => {
  const icons: { [key: string]: typeof faCheckCircle } = {
    'success': faCheckCircle,
    'error': faExclamationCircle,
    'warning': faExclamationTriangle,
    'info': faInfoCircle
  };
  return icons[type] || faInfoCircle;
};

const getNotificationColor = (type: string) => {
  const colors: { [key: string]: string } = {
    'success': '#10b981',
    'error': '#ef4444',
    'warning': '#f59e0b',
    'info': '#3b82f6'
  };
  return colors[type] || '#3b82f6';
};

export default function Notification({ id, message, type, onRemove }: NotificationProps) {
  return (
    <div
      className="fixed top-20 right-5 text-white px-5 py-4 rounded-xl shadow-lg z-50 flex items-center gap-4 max-w-xs animate-slide-in-right"
      style={{
        background: getNotificationColor(type),
        animation: 'slideInRight 0.3s ease-out'
      }}
    >
      <div className="flex items-center gap-3">
        <FontAwesomeIcon icon={getNotificationIcon(type)} className="text-sm" />
        <span>{message}</span>
      </div>
      <button 
        className="bg-transparent border-none text-white cursor-pointer p-1 rounded transition-colors hover:bg-white hover:bg-opacity-20"
        onClick={() => onRemove(id)}
      >
        <FontAwesomeIcon icon={faTimes} className="text-sm" />
      </button>
    </div>
  );
}
