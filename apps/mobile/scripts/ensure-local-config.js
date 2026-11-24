// Creates src/config.local.ts from src/config.local.example.ts the first
// time the mobile app is installed, so the app always has a local overrides
// file to import. Never overwrites an existing file, and never fails the
// install: local overrides are optional.
const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'src', 'config.local.ts');
const example = path.join(__dirname, '..', 'src', 'config.local.example.ts');

if (!fs.existsSync(target) && fs.existsSync(example)) {
  try {
    fs.copyFileSync(example, target, fs.constants.COPYFILE_EXCL);
  } catch {
    console.warn('Could not create src/config.local.ts from its example.');
  }
}
