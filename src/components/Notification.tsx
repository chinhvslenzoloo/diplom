import { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
  id?: string;
}

export default function Notification({ message, type, duration = 3000, onClose, id }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if this notification has been shown before
    if (id) {
      const shownNotifications = JSON.parse(localStorage.getItem('shown_notifications') || '[]');
      if (shownNotifications.includes(id)) {
        setIsVisible(false);
        onClose?.();
        return;
      }
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose, id]);

  if (!isVisible) return null;

  const bgColor = {
    success: 'bg-green-50 border-green-500',
    error: 'bg-red-50 border-red-500',
    info: 'bg-blue-50 border-blue-500'
  }[type];

  const textColor = {
    success: 'text-green-700',
    error: 'text-red-700',
    info: 'text-blue-700'
  }[type];

  return (
    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-4 rounded-md border-l-4 shadow-lg ${bgColor}`}>
      <p className={`text-sm font-medium ${textColor}`}>{message}</p>
    </div>
  );
} 