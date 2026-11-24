import type {LocalMobileConfig} from './config';

// Local overrides for development. Copy this file to config.local.ts and
// uncomment the values you need. config.local.ts is gitignored, so your
// overrides never reach the repo, and release builds keep the production
// defaults. `npm run mobile:install` creates config.local.ts from this file
// when it is missing.
const localConfig: LocalMobileConfig = {
  // Point the debug app at an API on this computer. On the Android emulator
  // the host is reachable at 10.0.2.2; on a real device use the computer's
  // LAN address.
  // API_ORIGIN: 'http://10.0.2.2:3000',
  // Google sign in for your own API. The web client id is the one the API
  // checks tokens against.
  // GOOGLE_WEB_CLIENT_ID: '',
  // GOOGLE_IOS_CLIENT_ID: '',
};

export default localConfig;
