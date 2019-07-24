import * as helpers from '../../src/helpers';
import {DateTime} from 'luxon';

jest.mock('luxon', () => {
  return {
    DateTime: {
      local: jest.fn(),
      fromISO: jest.fn(),
    }
  }
});

describe('helpers', () => {

  describe('isRelativeDate', () => {
    it('returns true for today', () => {
      expect(helpers.isRelativeDate('today')).toBe(true);
    });
    it('returns true for tomorrow', () => {
      expect(helpers.isRelativeDate('tomorrow')).toBe(true);
    });
    it('returns false for iso date', () => {
      expect(helpers.isRelativeDate('2019-07-20T09:04:16+0000')).toBe(false);
    });
  });

  describe('parseStringToDate', () => {
    afterEach(() => {
      DateTime.local.mockReset();
    });

    it('returns todays datetime', () => {
      const today = '2019-07-20T09:04:16+0000';
      DateTime.local.mockReturnValue(today);
      expect(helpers.parseStringToDate('today')).toBe(today);
    });

    it('returns tomorrows datetime', () => {
      const tomorrow = '2019-07-21T09:04:16+0000';
      DateTime.local.mockReturnValue({plus: jest.fn().mockReturnValue(tomorrow)});
      expect(helpers.parseStringToDate('tomorrow')).toBe(tomorrow);
      expect(DateTime.local).toHaveBeenCalled();
    });

    it('returns tomorrows datetime', () => {
      const tomorrow = '2019-07-21T09:04:16+0000';
      DateTime.local.mockReturnValue({plus: jest.fn().mockReturnValue(tomorrow)});
      expect(helpers.parseStringToDate('tomorrow')).toBe(tomorrow);
      expect(DateTime.local).toHaveBeenCalled();
    });

    it('returns parsed datetime', () => {
      const isoDate = '2019-07-21T09:04:16+0000';
      DateTime.fromISO.mockReturnValue('ISO Formatted DateTime');
      expect(helpers.parseStringToDate('2019-07-21T09:04:16+0000')).toEqual('ISO Formatted DateTime');
      expect(DateTime.local).not.toHaveBeenCalled();
      expect(DateTime.fromISO).toHaveBeenCalled();
    });
  });
});
