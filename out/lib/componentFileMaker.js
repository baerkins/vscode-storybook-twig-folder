"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentFileMaker = componentFileMaker;
/** biome-ignore-all assist/source/organizeImports: oi vey */
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const stringFormatting_1 = require("./stringFormatting");
const createFile_1 = require("./createFile");
const storybookFileMaker_1 = require("./storybookFileMaker");
// import { log } from './logger';
// biome-ignore lint/suspicious/noExplicitAny: Type to come
function componentFileMaker(targetPath, dirName, settings) {
    const componentPath = path.resolve(targetPath, dirName);
    // Create folder path
    if (!fs.existsSync(componentPath)) {
        fs.mkdir(componentPath, { recursive: true }, (err) => {
            if (err) {
                throw err;
            }
            // Create component naming schemes
            const componentFileName = dirName;
            const componentTitleCase = (0, stringFormatting_1.toTitleCase)(dirName);
            // Create twig file
            if (settings?.addTwigFile && settings.addTwigFile) {
                (0, createFile_1.createFile)(componentPath, componentFileName, 'twig');
            }
            // Create html file
            if (settings?.addHtmlFile && settings.addHtmlFile) {
                (0, createFile_1.createFile)(componentPath, componentFileName, 'html');
            }
            // Create css file
            if (settings?.addCssFile && settings.addCssFile) {
                (0, createFile_1.createFile)(componentPath, componentFileName, 'css');
            }
            // Create js file
            if (settings?.addJsFile) {
                (0, createFile_1.createFile)(componentPath, componentFileName, 'js');
            }
            // Create pcss file
            if (settings?.addPcssFile) {
                (0, createFile_1.createFile)(componentPath, componentFileName, 'pcss');
            }
            // Create sass file
            if (settings?.addSassFile) {
                (0, createFile_1.createFile)(componentPath, componentFileName, 'sass');
            }
            // Create scss file
            if (settings?.addScssFile) {
                (0, createFile_1.createFile)(componentPath, componentFileName, 'scss');
            }
            if (settings.addStoriesJS || settings.addStoriesTS) {
                (0, storybookFileMaker_1.storybookFileMaker)(dirName, componentPath, settings);
            }
        });
    }
}
//# sourceMappingURL=componentFileMaker.js.map