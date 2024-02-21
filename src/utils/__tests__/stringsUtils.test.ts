import {stringUtils} from '../stringsUtils';

describe('stringUtils', () => {
  describe('capitalizeFirstLetter', () => {
    it('should capitalize the first letter of each world', () => {
      expect(stringUtils.capitalizeFirstLetter('Ana maria')).toBe('Ana Maria');
      expect(stringUtils.capitalizeFirstLetter('ANA MARIA')).toBe('Ana Maria');
      expect(stringUtils.capitalizeFirstLetter('maria')).toBe('Maria');
      expect(stringUtils.capitalizeFirstLetter('MARIA')).toBe('Maria');
      expect(stringUtils.capitalizeFirstLetter('MaRia')).toBe('Maria');
    });

    it('should remove leading/trailing spaces', () => {
      expect(stringUtils.capitalizeFirstLetter(' ana maria ')).toBe(
        'Ana Maria',
      );
      expect(stringUtils.capitalizeFirstLetter('Ana maria ')).toBe('Ana Maria');
    });
  });
});
