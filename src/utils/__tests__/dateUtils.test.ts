import {add, formatISO, sub, Duration} from 'date-fns';

import {dateUtils} from '../dateUtils';

const MOCKED_NOW = 1696573824333;

function getDateISO(duration: Duration, op?: 'sub' | 'add') {
  op = op || 'sub';

  const time =
    op === 'sub' ? sub(Date.now(), duration) : add(Date.now(), duration);
  const timeIso = formatISO(time);
  return dateUtils.formatRelative(timeIso);
}
describe('dateUtils', () => {
  describe('formatRelative', () => {
    beforeAll(() => {
      jest.spyOn(Date, 'now').mockImplementation(() => MOCKED_NOW);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    test('should be displayed in seconds if less than a seconds', () => {
      expect(getDateISO({seconds: 30})).toBe('30 s');
    });

    test('should be displayed in seconds if less than a minute', () => {
      expect(getDateISO({minutes: 20})).toBe('20 m');
    });

    test('should be displayed in seconds if less than a hours', () => {
      expect(getDateISO({hours: 15})).toBe('15 h');
    });

    test('should be displayed in seconds if less than a days', () => {
      expect(getDateISO({days: 5})).toBe('5 d');
    });

    test('should be displayed in seconds if less than a weeks', () => {
      expect(getDateISO({weeks: 3, days: 2})).toBe('3 sem');
    });

    test('should be displayed in seconds if less than a months', () => {
      expect(getDateISO({months: 10})).toBe('10 mes');
    });

    test('should be displayed dd/MM/yyyy if more than 12months go', () => {
      expect(getDateISO({months: 13})).toBe('06/09/2022');
    });

    test('should be displayed dd/MM/yyyy if future date', () => {
      expect(getDateISO({days: 2}, 'add')).toBe('08/10/2023');
    });
  });
});
