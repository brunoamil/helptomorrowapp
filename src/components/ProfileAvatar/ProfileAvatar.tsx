import React from 'react';
import {Image} from 'react-native';

interface ProfileAvatarProps {
  imagemURL: string;
  /**
   * @default 32
   */
  size?: number;
  /**
   * @default 14
   */
  borderRadius?: number;
}
export function ProfileAvatar({
  imagemURL,
  size = 32,
  borderRadius = 14,
}: ProfileAvatarProps) {
  return (
    <Image
      source={{uri: imagemURL}}
      style={{width: size, height: size, borderRadius}}
    />
  );
}
