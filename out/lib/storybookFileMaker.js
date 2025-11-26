"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storybookFileMaker = storybookFileMaker;
const stringFormatting_1 = require("./stringFormatting");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const defaultStoryBookContent_1 = require("./defaultStoryBookContent");
function storybookFileMaker(filename, filepath, settings) {
    const componentImportSuffix = settings?.ComponentImportSuffix || 'Template';
    const componentPascalCase = (0, stringFormatting_1.toPascalCase)(filename);
    const componentImportName = `${componentPascalCase}${componentImportSuffix}`;
    const componentTitle = buildComponentTitle(filename, filepath, settings);
    const importCss = false;
    const importJs = false;
    if (settings.addStoriesJS) {
        const jsContent = (0, defaultStoryBookContent_1.getDefaultStoryContent)(componentImportName, filename, componentTitle, componentPascalCase, importCss, importJs);
        (0, node_fs_1.writeFile)((0, node_path_1.resolve)(filepath, `${filename}.stories.js`), jsContent, { encoding: "utf8" }, (err) => {
            if (err) {
                throw err;
            }
        });
    }
    if (settings.addStoriesTS) {
        const storybookEngine = settings.storybookEngine || '@storybook/html-vite';
        const tsContent = (0, defaultStoryBookContent_1.getDefaultStoryContentTS)(componentImportName, filename, componentTitle, componentPascalCase, importCss, importJs, storybookEngine);
        (0, node_fs_1.writeFile)((0, node_path_1.resolve)(filepath, `${filename}.stories.ts`), tsContent, { encoding: "utf8" }, (err) => {
            if (err) {
                throw err;
            }
        });
    }
}
function buildComponentTitle(filename, path, settings) {
    // Base Title
    const titleArray = [];
    let baseDirectories = [];
    if (settings?.OrganizeFromParentDirectoryName && settings?.OrganizeFromParentDirectoryName !== '') {
        baseDirectories = settings.OrganizeFromParentDirectoryName.split(',').map((dir) => dir.trim());
    }
    // Check if any of the base directories exist in the path
    const foundBaseDir = baseDirectories.find((dir) => path.includes(dir));
    if (foundBaseDir !== undefined) {
        if (!settings.OmitParentFolderFromTitle) {
            // Add base directory as first title
            titleArray.push((0, stringFormatting_1.toTitleCase)(foundBaseDir.split('/')[0]));
        }
        // Trim path to start after the found base directory
        let trimmedPath = path.split(foundBaseDir)[1];
        if (trimmedPath) {
            trimmedPath = removeLastInstance(trimmedPath, filename);
            const pathParts = trimmedPath.split(/[/\\]/).filter(part => part && part !== '');
            for (const part of pathParts) {
                titleArray.push((0, stringFormatting_1.toTitleCase)(part));
            }
        }
    }
    // Add component title
    titleArray.push((0, stringFormatting_1.toTitleCase)(filename));
    return titleArray.join('/');
}
function removeLastInstance(input, directory) {
    const lastIndex = input.lastIndexOf(directory);
    if (lastIndex === -1) {
        return input;
    }
    return (input.slice(0, lastIndex) +
        input.slice(lastIndex + directory.length));
}
//# sourceMappingURL=storybookFileMaker.js.map