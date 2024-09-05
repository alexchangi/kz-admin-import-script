#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import https from 'https';
import unzipper from 'unzipper';

// Use the current directory and create the path for the 'admin' folder
const currentDir = process.cwd();
const adminPath = path.join(currentDir, 'apps', 'admin');
const repoUrl =
  'https://github.com/alexchangi/kz-admin-public/archive/refs/heads/main.zip';
const zipFilePath = path.join(currentDir, 'kz-admin-public.zip');

// Function to create directory if it doesn't exist
const createDirectory = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Function to download a file from a URL
const downloadFile = (url: string, dest: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close((err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      })
      .on('error', (err) => {
        fs.unlink(dest, () => {}); // Ensure file is removed on error
        reject(err);
      });
  });
};

// Function to extract a ZIP file
const extractZip = (zipPath: string, extractTo: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(zipPath)
      .pipe(unzipper.Extract({ path: extractTo }))
      .on('close', resolve)
      .on('error', reject);
  });
};

// Function to download and extract the repository
const downloadAndExtractRepo = async (): Promise<void> => {
  createDirectory(adminPath);

  if (fs.existsSync(zipFilePath)) {
    console.log('Removing existing zip file...');
    fs.unlinkSync(zipFilePath);
  }

  console.log('Downloading the repository...');
  await downloadFile(repoUrl, zipFilePath);

  console.log('Extracting the ZIP file...');
  await extractZip(zipFilePath, adminPath);

  console.log('Removing the ZIP file...');
  fs.unlinkSync(zipFilePath);

  console.log(
    'Repository contents have been successfully imported into the monorepo.'
  );
};

downloadAndExtractRepo().catch((err) => {
  console.error('Error during import:', err);
});
