import React from 'react';

import {BackButton} from '../../BackButton/BackButton';
import {Box, BoxProps} from '../../Box/Box';
import {ScreenProps} from '../../Screen/Screen';
import {Text} from '../../Text/Text';

const ICON_SIZE = 20;

type Props = Pick<ScreenProps, 'canGoBack' | 'title' | 'HeaderComponent'> &
  BoxProps;
export function ScreenHeader({
  title,
  canGoBack,
  HeaderComponent,
  ...boxProps
}: Props) {
  if (!title && !canGoBack && !HeaderComponent) {
    return null;
  }
  const showBackLabel = !title && !HeaderComponent;

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      mb="s24"
      {...boxProps}>
      {canGoBack && <BackButton showBackLabel={showBackLabel} />}
      {HeaderComponent}
      {title && <Text preset="headingSmall">{title}</Text>}
      {title && <Box width={ICON_SIZE} backgroundColor="carrotSecondary" />}
    </Box>
  );
}
