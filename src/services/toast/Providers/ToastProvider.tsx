import React, {createContext, PropsWithChildren, useState} from 'react';

import {Toast, ToastService} from '../toastTypes';

export const ToastContext = createContext<ToastService>({
  toast: null,
  hideToast: () => {},
  showToast: () => {},
});

export function ToastProvider({children}: PropsWithChildren) {
  const [toast, setToast] = useState<ToastService['toast']>(null);

  function showToast(_toast: Toast) {
    setToast(_toast);
  }

  function hideToast() {
    setToast(null);
  }
  return (
    <ToastContext.Provider value={{toast, showToast, hideToast}}>
      {children}
    </ToastContext.Provider>
  );
}
