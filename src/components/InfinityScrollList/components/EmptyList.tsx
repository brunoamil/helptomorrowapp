import React from 'react';

// import {ActivityIndicator, Box, Button, Text} from '@components';
import {ActivityIndicator} from '../../ActivityIndicator/ActivityIndicator';
import {Box} from '../../Box/Box';
import {Button} from '../../Button/Button';
import {Text} from '../../Text/Text';

export interface EmptyListProps {
  loading: boolean;
  error: unknown;
  refetch: () => void;
  emptyMessage?: string;
  errorMessage?: string;
}
export function EmptyList({loading, error, refetch, emptyMessage = 'Não há publicações no seu feed.', errorMessage = 'Não foi possível carregar o feed'}: EmptyListProps) {
  let component = (
    <Text preset="paragraphMedium" bold>
      {emptyMessage}
    </Text>
  );

  if (loading) {
    component = <ActivityIndicator color="primary" />;
  }

  if (error) {
    component = (
      <>
        <Text preset="paragraphMedium" bold mb="s16">
         {errorMessage}
        </Text>
        <Button title="Recarregar" preset="outline" onPress={refetch} />
      </>
    );
  }

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      {component}
    </Box>
  );
}
