import {useState} from 'react';

export interface MutationOptions<TData> {
  onSucess: (data: TData) => void;
  onError?: (message: string) => void;
  errorMessage?: string;
}

export function useMutation<TVariables, TData>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: MutationOptions<TData>,
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean | null>(null);

  async function mutate(variables: TVariables) {
    try {
      setLoading(true);
      setError(null);
      const data = await mutationFn(variables);
      if (options?.onSucess) {
        options.onSucess(data);
      }
    } catch (mutateError) {
      setError(true);
      if (options?.onError) {
        options.onError(options.errorMessage || 'Erro ao realizar mutação');
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    mutate,
    loading,
    error,
  };
}
