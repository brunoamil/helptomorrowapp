import React, {useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import {Box, BoxProps, Icon} from '@components';
import {useAppSafeArea} from '@hooks';
import {AppScreenProps} from '@routes';

const CAMERA_VIEW = Dimensions.get('screen').width;
const CONTROL_HEIGHT = (Dimensions.get('screen').height - CAMERA_VIEW) / 2;
const CONTROL_DIFF = 20;
export function CameraScreen({navigation}: AppScreenProps<'CameraScreen'>) {
  const [flashOn, setFlashOn] = useState(false);
  const {top} = useAppSafeArea();

  function toggleFlash() {
    setFlashOn(prev => !prev);
  }
  return (
    <Box flex={1}>
      <Box backgroundColor="grayWhite" style={StyleSheet.absoluteFill} />
      <Box flex={1} justifyContent="space-between">
        <Box {...$controlAreaTop} style={{paddingTop: top}}>
          <Icon
            size={20}
            name="arrowLeft"
            color="grayWhite"
            onPress={navigation.goBack}
          />
          <Icon
            size={20}
            name={flashOn ? 'flashOn' : 'flashOff'}
            color="grayWhite"
            onPress={toggleFlash}
          />
          <Box width={20} />
        </Box>
        <Box {...$controlAreaBottom}>
          <Icon name="cameraClick" color="grayWhite" />
        </Box>
      </Box>
    </Box>
  );
}

const $controlAreaTop: BoxProps = {
  backgroundColor: 'black60',
  height: CONTROL_HEIGHT - CONTROL_DIFF,
  justifyContent: 'space-between',
  flexDirection: 'row',
  paddingHorizontal: 's24',
};

const $controlAreaBottom: BoxProps = {
  backgroundColor: 'black60',
  height: CONTROL_HEIGHT + CONTROL_DIFF,
  alignItems: 'center',
  justifyContent: 'center',
};
