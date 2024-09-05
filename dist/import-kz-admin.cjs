#!/usr/bin/env node
"use strict";
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
// Use the current directory and create the path for the 'admin' folder
const currentDir = process.cwd();
const adminPath = path.join(currentDir, 'apps', 'admin');
// Function to create directory if it doesn't exist
const createDirectory = (dir) => {
    if (!fs.existsSync(dir)) {
        console.log(`Creating directory: ${dir}`);
        fs.mkdirSync(dir, { recursive: true });
    }
};
// Function to clone or update the React app repository
const cloneOrUpdateRepo = () => {
    createDirectory(adminPath);
    // Quote paths to handle spaces
    const repoUrl = 'https://github.com/alexchangi/kz-admin-public';
    const destinationPath = `"${adminPath}"`;
    if (fs.existsSync(adminPath)) {
        console.log('Pulling the latest changes for the React app...');
        execSync(`git -C ${destinationPath} pull`, { stdio: 'inherit' });
    }
    else {
        console.log('Cloning the React app repository...');
        execSync(`git clone ${repoUrl} ${destinationPath}`, { stdio: 'inherit' });
    }
    console.log('Removing .git directory from the copied React app...');
    execSync(`rm -rf ${destinationPath}/.git`, { stdio: 'inherit' });
    console.log('React app has been successfully imported into the monorepo.');
};
cloneOrUpdateRepo();
//# sourceMappingURL=import-kz-admin.js.map