import NetInfo, {
  NetInfoState,
  NetInfoStateType,
} from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

const network = {
  details: {
    isConnectionExpensive: false,
  },
  isConnected: true,
  isInternetReachable: true,
  isWifiEnabled: true,
  type: NetInfoStateType.other,
  key: 'Network',
};

export const useNetworkState = () => {
  const [networkState, setNetworkState] = useState<
    NetInfoState | typeof network
  >(network);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetworkState(state);
    });
    return unsubscribe;
  }, [setNetworkState, networkState?.isInternetReachable]);
  return networkState;
};
