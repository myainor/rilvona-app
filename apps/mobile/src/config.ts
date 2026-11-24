// Local overrides live in ./config.local (see config.local.example.ts) and
// are never committed. Every build, debug included, talks to the production
// API (and so the production database) unless the local file says otherwise.
// Debug builds no longer use a server on this computer, so there is nothing
// to start or `adb reverse` before running the app.
import localConfig from './config.local';

export type LocalMobileConfig = {
  API_ORIGIN?: string;
  GOOGLE_WEB_CLIENT_ID?: string;
  GOOGLE_IOS_CLIENT_ID?: string;
};

const DEFAULT_API_ORIGIN = 'https://api.rilvona.com';
const DEFAULT_GOOGLE_WEB_CLIENT_ID =
  '336016339844-qigplr2850rt69199hmcpmbfkmfksua0.apps.googleusercontent.com';
const DEFAULT_GOOGLE_IOS_CLIENT_ID = '';

// Merge the local overrides over the production defaults, field by field, so a
// contributor can point the debug app at their own API without touching the
// values they did not change.
export function resolveMobileConfig(local: LocalMobileConfig) {
  const apiOrigin = local.API_ORIGIN ?? DEFAULT_API_ORIGIN;
  return {
    API_ORIGIN: apiOrigin,
    API_BASE_URL: `${apiOrigin}/api/v1`,
    GOOGLE_WEB_CLIENT_ID:
      local.GOOGLE_WEB_CLIENT_ID ?? DEFAULT_GOOGLE_WEB_CLIENT_ID,
    GOOGLE_IOS_CLIENT_ID:
      local.GOOGLE_IOS_CLIENT_ID ?? DEFAULT_GOOGLE_IOS_CLIENT_ID,
  };
}

const resolved = resolveMobileConfig(localConfig);

export const API_ORIGIN = resolved.API_ORIGIN;
export const API_BASE_URL = resolved.API_BASE_URL;

// Google sign in. The web client id is the one the API checks tokens against (the API lists it in GOOGLE_CLIENT_IDS).
// It must be an OAuth client of type "Web application"; a separate "Android" client for com.ainor.hiihive and the
// signing key's SHA-1 must exist in the same Google Cloud project. Leave empty until those exist.
export const GOOGLE_WEB_CLIENT_ID = resolved.GOOGLE_WEB_CLIENT_ID;
export const GOOGLE_IOS_CLIENT_ID = resolved.GOOGLE_IOS_CLIENT_ID;
