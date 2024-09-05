#!/usr/bin/env node
'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
const child_process_1 = require('child_process');
const fs = __importStar(require('fs'));
const path = __importStar(require('path'));
const REACT_APP_REPO_URL = 'https://github.com/alexchangi/kz-admin-public';
// Set the destination path to the 'admin' folder inside the 'apps' folder within the current directory
const DESTINATION_PATH = path.join(process.cwd(), 'apps', 'admin');
const cloneOrUpdateRepo = () => {
  // Ensure the 'admin' directory exists within the 'apps' directory
  if (!fs.existsSync(DESTINATION_PATH)) {
    console.log(`Creating directory: ${DESTINATION_PATH}`);
    fs.mkdirSync(DESTINATION_PATH, { recursive: true });
  }
  if (fs.existsSync(path.join(DESTINATION_PATH, '.git'))) {
    console.log('Pulling the latest changes for the React app...');
    (0, child_process_1.execSync)(`git -C ${DESTINATION_PATH} pull`, {
      stdio: 'inherit',
    });
  } else {
    console.log('Cloning the React app repository...');
    (0, child_process_1.execSync)(
      `git clone ${REACT_APP_REPO_URL} ${DESTINATION_PATH}`,
      {
        stdio: 'inherit',
      }
    );
  }
  console.log('Removing .git directory from the copied React app...');
  (0, child_process_1.execSync)(`rm -rf ${DESTINATION_PATH}/.git`, {
    stdio: 'inherit',
  });
  console.log(
    "React app has been successfully imported into the 'apps/admin' directory."
  );
};
cloneOrUpdateRepo();
//# sourceMappingURL=import-kz-admin.js.map
