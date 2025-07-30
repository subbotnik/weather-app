import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';

import { Router } from './navigation/Router';
import { StoreProvider } from './store';

export default function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <SafeAreaProvider>
          <GestureHandlerRootView>
            <Router />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ToastProvider>
    </StoreProvider>
  );
}
