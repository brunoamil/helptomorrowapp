function capitalizeFirstLetter(value: string): string {
  return value
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const stringUtils = {
  capitalizeFirstLetter,
};
