import {ImageForUpload} from './multiMediaTypes';

function prepareImageForUpload(imageUri: string): ImageForUpload {
  return {
    uri: imageUri,
    name: 'name',
    type: 'image/jpeg',
  };
}
export const multiMediaService = {
  prepareImageForUpload,
};
