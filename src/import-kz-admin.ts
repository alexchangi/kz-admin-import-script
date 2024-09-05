#!/usr/bin/env node

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const REACT_APP_REPO_URL: string =
  'https://github.com/alexchangi/kz-admin-public';

// Set the destination path to the 'admin' folder inside the 'apps' folder within the current directory
const DESTINATION_PATH: string = path.join(process.cwd(), 'apps', 'admin');

const cloneOrUpdateRepo = (): void => {
  // Ensure the 'admin' directory exists within the 'apps' directory
  if (!fs.existsSync(DESTINATION_PATH)) {
    console.log(`Creating directory: ${DESTINATION_PATH}`);
    fs.mkdirSync(DESTINATION_PATH, { recursive: true });
  }

  if (fs.existsSync(path.join(DESTINATION_PATH, '.git'))) {
    console.log('Pulling the latest changes for the React app...');
    execSync(`git -C ${DESTINATION_PATH} pull`, { stdio: 'inherit' });
  } else {
    console.log('Cloning the React app repository...');
    execSync(`git clone ${REACT_APP_REPO_URL} ${DESTINATION_PATH}`, {
      stdio: 'inherit',
    });
  }

  console.log('Removing .git directory from the copied React app...');
  execSync(`rm -rf ${DESTINATION_PATH}/.git`, { stdio: 'inherit' });

  console.log(
    "React app has been successfully imported into the 'apps/admin' directory."
  );
};

cloneOrUpdateRepo();
