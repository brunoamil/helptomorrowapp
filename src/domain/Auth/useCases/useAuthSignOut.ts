import {useAuthCredentials, useSearchHistoryService} from '@services';
import {useMutation} from '@tanstack/react-query';

import {authService} from '../authService';

export function useAuthSignOut() {
  const {clearUserList} = useSearchHistoryService();
  const {removeCredentials} = useAuthCredentials();
  const mutation = useMutation<string, unknown, void>({
    mutationFn: authService.signOut,
    retry: false,
    onSettled: () => {
      removeCredentials();
      clearUserList();
    },
  });

  return {
    isLoading: mutation.isLoading,
    signOut: () => mutation.mutate(),
  };
}
