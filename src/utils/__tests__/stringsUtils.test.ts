import {stringUtils} from '../stringsUtils';

describe('stringUtils', () => {
  describe('capitalizeFirstLetter', () => {
    it('should capitalize the first letter oeach word', () => {
      expect(stringUtils.capitalizeFirstLetter('Ana maria')).toBe('Ana Maria');
      expect(stringUtils.capitalizeFirstLetter('maria')).toBe('Maria');
      expect(stringUtils.capitalizeFirstLetter('MARIA')).toBe('Maria');
      expect(stringUtils.capitalizeFirstLetter('MariA')).toBe('Maria');
    });

    it('should remove leading trailing spaces', () => {
      expect(stringUtils.capitalizeFirstLetter(' Maria ')).toBe('Maria');
      expect(stringUtils.capitalizeFirstLetter(' Maria  ')).toBe('Maria');
      expect(stringUtils.capitalizeFirstLetter('  Maria  ')).toBe('Maria');
      expect(stringUtils.capitalizeFirstLetter('  Maria')).toBe('Maria');
      expect(stringUtils.capitalizeFirstLetter('Maria  ')).toBe('Maria');
    });
  });
});
