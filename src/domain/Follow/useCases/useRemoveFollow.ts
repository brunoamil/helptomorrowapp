import {useState} from 'react';

import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {followService} from '../followService';

import {useFollowUser} from './useFollowUser';

export function useRemoveFollow(options?: MutationOptions<void>) {
  const [savedUserId, setSavedUserId] = useState<number | null>(null);

  const {followUser} = useFollowUser();
  const queryClient = useQueryClient();

  const {mutate, isLoading} = useMutation({
    mutationFn: followService.removeFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QueryKeys.MyFollowingList]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.MyFollowersList]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.UserGetById]});
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    onError: () => {
      if (options?.onError) {
        options.onError(options.errorMessage || 'erro ao deixar de seguir');
      }
    },
  });

  function removeFollow({
    followId,
    userId,
  }: {
    followId: number;
    userId?: number;
  }) {
    if (userId) {
      setSavedUserId(userId);
    }
    mutate(followId);
  }

  function undoRemoveFollow() {
    if (savedUserId) {
      followUser(savedUserId);
    }
  }

  return {
    removeFollow,
    undoRemoveFollow,
    isLoading,
  };
}
