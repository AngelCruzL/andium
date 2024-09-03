import { TestBed } from '@angular/core/testing';

import { PersistenceService } from './persistence.service';

describe('PersistenceService', () => {
  let service: PersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get data correctly', () => {
    const key = 'testKey';
    const data = { name: 'test' };
    service.set(key, data);
    expect(service.get(key)).toEqual(data);
  });

  it('should return null for non-existent key', () => {
    expect(service.get('nonExistentKey')).toBeNull();
  });

  it('should handle JSON parse error gracefully', () => {
    const key = 'malformedKey';
    localStorage.setItem(key, '{ malformed JSON }');
    expect(service.get(key)).toBeNull();
  });

  it('should handle localStorage setItem error gracefully', () => {
    const key = 'testKey';
    const data = { name: 'test' };
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('localStorage error');
    });
    expect(() => service.set(key, data)).not.toThrow();
  });

  it('should handle localStorage getItem error gracefully', () => {
    const key = 'testKey';
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('localStorage error');
    });
    expect(service.get(key)).toBeNull();
  });
});
