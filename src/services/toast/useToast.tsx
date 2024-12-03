// import {Toast} from '@components';

import {
  useToastServiceZustand,
  useToastZustand,
} from './Providers/useToastZustand';
import {ToastService} from './toastTypes';
// import {useToastContext} from './useToastContext';

export function useToast(): ToastService['toast'] {
  //context
  // const {toast} = useToastContext();
  // return toast;
  return useToastZustand();
}

export function useToastService(): Pick<
  ToastService,
  'showToast' | 'hideToast'
> {
  //context
  // const {showToast, hideToast} = useToastContext();
  // return {
  //   showToast,
  //   hideToast,
  // };

  return useToastServiceZustand();
}
