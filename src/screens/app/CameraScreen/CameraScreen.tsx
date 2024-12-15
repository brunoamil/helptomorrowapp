import React, {useRef, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import {
  useCameraDevice,
  Camera,
  useCameraFormat,
  Templates,
} from 'react-native-vision-camera';

import {Box, BoxProps, Icon, PermissionManager} from '@components';
import {useAppSafeArea, useAppState} from '@hooks';
import {AppScreenProps} from '@routes';

const CAMERA_VIEW = Dimensions.get('screen').width;
const CONTROL_HEIGHT = (Dimensions.get('screen').height - CAMERA_VIEW) / 2;
const CONTROL_DIFF = 30;
export function CameraScreen({navigation}: AppScreenProps<'CameraScreen'>) {
  const cameraRef = useRef<Camera>(null);
  const [flashOn, setFlashOn] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const {top} = useAppSafeArea();
  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });
  const format = useCameraFormat(device, Templates.Instagram);
  const isFocused = useIsFocused();
  const appState = useAppState();
  const useActive = isFocused && appState === 'active';

  async function takePhoto() {
    if (cameraRef.current) {
      const photoFile = await cameraRef.current?.takePhoto({
        flash: flashOn ? 'on' : 'off',
        qualityPrioritization: 'quality',
      });

      navigation.navigate('PublishPostScreen', {
        imageUri: `file://${photoFile?.path}`,
      });
    }
  }
  function toggleFlash() {
    setFlashOn(prev => !prev);
  }
  return (
    <PermissionManager
      permissionName="camera"
      description="Permissa o HelpTomorrow acessar a sua câmera">
      <Box flex={1}>
        {device != null && (
          <Camera
            ref={cameraRef}
            format={format}
            device={device}
            isActive={useActive}
            onInitialized={() => setIsReady(true)}
            style={StyleSheet.absoluteFill}
            photo={true}
            enableHighQualityPhotos={true}
          />
        )}

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
            {isReady && (
              <Icon name="cameraClick" color="grayWhite" onPress={takePhoto} />
            )}
          </Box>
        </Box>
      </Box>
    </PermissionManager>
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
