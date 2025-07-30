import React from 'react';

import { RootStore } from './modules';

const StoreContext = React.createContext<RootStore | null>(null);
StoreContext.displayName = 'StoreContext';
let store: RootStore;

export function StoreProvider({children}: {children: React.ReactNode}) {
  // only create root store once (store is a singleton)
  if (!store) {
    store = new RootStore();
  }
  const root = store;

  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
}

export const useStore = () => {
  const context = React.useContext(StoreContext);
  if (!context) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return context;
};
