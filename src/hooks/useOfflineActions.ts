import { useCallback } from 'react';
import { useToast } from 'react-native-toast-notifications';
interface IOfflineHook {
  hideOfflineToastIfNeeded: () => void;
  showOfflineToastIfNeeded: () => void;
}
export const useOfflineActions = (): IOfflineHook => {
  const toast = useToast();
  const hideOfflineToastIfNeeded = useCallback(() => {
    toast.hideAll();
  }, []);

  const showOfflineToastIfNeeded = useCallback(() => {
    toast.show('You`re offline. Check your connection');
  }, []);

  return {hideOfflineToastIfNeeded, showOfflineToastIfNeeded};
};
