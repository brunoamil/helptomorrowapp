import {useAuthCredentials} from '@services';
import {useMutation} from 'react-query';

import {authService} from '../authService';

export function useAuthSignOut() {
  const {removeCredentials} = useAuthCredentials();
  const mutation = useMutation<string, unknown, void>({
    mutationFn: authService.signOut,
    retry: false,
    onSuccess: () => {
      authService.removeToken();
      removeCredentials();
    },
  });

  return {
    isLoading: mutation.isLoading,
    signOut: () => mutation.mutate(),
  };
}
