import React from 'react';
import {Image} from 'react-native';

interface ProfileAvatarProps {
  imageURL: string;
  /**
   *  @default 32
   */
  size?: number;
  /**
   *  @default 16
   */
  borderRadius?: number;
}
export function ProfileAvatar({
  imageURL,
  size = 32,
  borderRadius = 16,
}: ProfileAvatarProps) {
  return (
    <Image
      source={{uri: imageURL}}
      style={{width: size, height: size, borderRadius}}
    />
  );
}
