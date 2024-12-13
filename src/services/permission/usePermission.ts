import {useEffect, useState} from 'react';

import {permissionService} from './permissionService';
import {PermissionName, PermissionStatus} from './permissionTypes';

export function usePermission(permissionName: PermissionName) {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<PermissionStatus>();

  async function checkPermission() {
    try {
      setLoading(true);
      const initialState = await permissionService.check(permissionName);

      if (initialState === 'denied') {
        const _status = await permissionService.request(permissionName);
        setStatus(_status);
      } else {
        setStatus(initialState);
      }
    } catch {
      setStatus('unavailable');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    checkPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    status,
    loading,
  };
}
