
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

export const useGoogleAnalytics = (measurementId: string) => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', measurementId, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location, measurementId]);

  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, parameters);
    }
  };

  return { trackEvent };
};
