import {
  API_BASE_URL,
  API_ORIGIN,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_WEB_CLIENT_ID,
  resolveMobileConfig,
} from '../src/config';

// Use an empty local config so the test does not depend on the
// untracked src/config.local.ts created on install.
jest.mock('../src/config.local', () => ({__esModule: true, default: {}}));

test('keeps the production defaults without local overrides', () => {
  const resolved = resolveMobileConfig({});

  expect(resolved.API_ORIGIN).toBe('https://api.rilvona.com');
  expect(resolved.API_BASE_URL).toBe('https://api.rilvona.com/api/v1');
  expect(resolved.GOOGLE_WEB_CLIENT_ID).toMatch(
    /^\d+-[a-z0-9]+\.apps\.googleusercontent\.com$/,
  );
  expect(resolved.GOOGLE_IOS_CLIENT_ID).toBe('');
  expect(resolved.API_ORIGIN).toBe(API_ORIGIN);
  expect(resolved.API_BASE_URL).toBe(API_BASE_URL);
  expect(resolved.GOOGLE_WEB_CLIENT_ID).toBe(GOOGLE_WEB_CLIENT_ID);
  expect(resolved.GOOGLE_IOS_CLIENT_ID).toBe(GOOGLE_IOS_CLIENT_ID);
});

test('uses every local override when all of them are set', () => {
  const resolved = resolveMobileConfig({
    API_ORIGIN: 'http://10.0.2.2:3000',
    GOOGLE_WEB_CLIENT_ID: 'local-web-client-id',
    GOOGLE_IOS_CLIENT_ID: 'local-ios-client-id',
  });

  expect(resolved.API_ORIGIN).toBe('http://10.0.2.2:3000');
  expect(resolved.API_BASE_URL).toBe('http://10.0.2.2:3000/api/v1');
  expect(resolved.GOOGLE_WEB_CLIENT_ID).toBe('local-web-client-id');
  expect(resolved.GOOGLE_IOS_CLIENT_ID).toBe('local-ios-client-id');
});

test('keeps the production Google client IDs when only the origin is overridden', () => {
  const resolved = resolveMobileConfig({API_ORIGIN: 'http://localhost:3000'});

  expect(resolved.API_ORIGIN).toBe('http://localhost:3000');
  expect(resolved.API_BASE_URL).toBe('http://localhost:3000/api/v1');
  expect(resolved.GOOGLE_WEB_CLIENT_ID).toBe(GOOGLE_WEB_CLIENT_ID);
  expect(resolved.GOOGLE_IOS_CLIENT_ID).toBe(GOOGLE_IOS_CLIENT_ID);
});
