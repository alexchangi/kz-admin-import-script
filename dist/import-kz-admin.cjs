#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const https_1 = __importDefault(require("https"));
const unzipper_1 = __importDefault(require("unzipper"));
// Use the current directory and create the path for the 'admin' folder
const currentDir = process.cwd();
const adminPath = path_1.default.join(currentDir, 'apps', 'admin');
const repoUrl = 'https://github.com/alexchangi/kz-admin-public/archive/refs/heads/main.zip';
const zipFilePath = path_1.default.join(currentDir, 'kz-admin-public.zip');
// Function to create directory if it doesn't exist
const createDirectory = (dir) => {
    if (!fs_1.default.existsSync(dir)) {
        console.log(`Creating directory: ${dir}`);
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
};
// Function to download a file from a URL
const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs_1.default.createWriteStream(dest);
        https_1.default
            .get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close((err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        })
            .on('error', (err) => {
            fs_1.default.unlink(dest, () => { }); // Ensure file is removed on error
            reject(err);
        });
    });
};
// Function to extract a ZIP file
const extractZip = (zipPath, extractTo) => {
    return new Promise((resolve, reject) => {
        fs_1.default.createReadStream(zipPath)
            .pipe(unzipper_1.default.Extract({ path: extractTo }))
            .on('close', resolve)
            .on('error', reject);
    });
};
// Function to download and extract the repository
const downloadAndExtractRepo = () => __awaiter(void 0, void 0, void 0, function* () {
    createDirectory(adminPath);
    if (fs_1.default.existsSync(zipFilePath)) {
        console.log('Removing existing zip file...');
        fs_1.default.unlinkSync(zipFilePath);
    }
    console.log('Downloading the repository...');
    yield downloadFile(repoUrl, zipFilePath);
    console.log('Extracting the ZIP file...');
    yield extractZip(zipFilePath, adminPath);
    console.log('Removing the ZIP file...');
    fs_1.default.unlinkSync(zipFilePath);
    console.log('Repository contents have been successfully imported into the monorepo.');
});
downloadAndExtractRepo().catch((err) => {
    console.error('Error during import:', err);
});
//# sourceMappingURL=import-kz-admin.js.map