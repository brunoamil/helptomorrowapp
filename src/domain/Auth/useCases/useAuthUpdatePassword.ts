import {MutationOptions} from '@infra';
import {useMutation} from '@tanstack/react-query';

import {authService} from '../authService';
import {EditPasswordParams} from '../authTypes';

export function useAuthUpdatePassword(options?: MutationOptions<string>) {
  const {mutate, isLoading} = useMutation<string, unknown, EditPasswordParams>({
    mutationFn: params => authService.updatePassword(params),
    retry: false,
    onError: error => {
      if (options?.onError) {
        options.onError(error);
      }
    },
    onSuccess: message => {
      if (options?.onSuccess) {
        options.onSuccess(message);
      }
    },
  });

  return {
    updatedPassword: (params: EditPasswordParams) => mutate(params),
    isLoading,
  };
}
