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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
/** biome-ignore-all assist/source/organizeImports: oi vey */
const vscode = __importStar(require("vscode"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const componentFileMaker_js_1 = require("./lib/componentFileMaker.js");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    const disposable = vscode.commands.registerCommand('createStorybookHtmlFolder', async (contextSelection, _allSelections) => {
        const uri = contextSelection ? contextSelection.fsPath : vscode.workspace?.workspaceFolders?.[0].uri.fsPath;
        if (!uri) {
            return;
        }
        const isDir = node_fs_1.default.lstatSync(uri).isDirectory();
        const settings = await vscode.workspace.getConfiguration('newStorybookHtmlFolder');
        const targetPath = !isDir ? node_path_1.default.dirname(uri) : uri;
        const inputBoxOptions = {
            ignoreFocusOut: true,
            placeHolder: 'Folder_Name',
            validateInput: (name) => {
                if (!name) {
                    return 'Name is required';
                }
                if (name.includes(' ')) {
                    return 'Spaces are not allowed';
                }
                if (name.includes('/')) {
                    return '/ is not allowed';
                }
                if (name.includes('\\')) {
                    return '\\ is not allowed';
                }
                if (node_fs_1.default.existsSync(node_path_1.default.resolve(targetPath, name))) {
                    return 'Name exists';
                }
                // no errors
                return undefined;
            },
            prompt: `Input the storybook folder name`
        };
        // Open Input Box
        vscode.window.showInputBox(inputBoxOptions)
            .then((dirName) => {
            if (dirName !== null && dirName !== undefined) {
                try {
                    (0, componentFileMaker_js_1.componentFileMaker)(targetPath, dirName, settings);
                }
                catch (error) {
                    vscode.window.showErrorMessage(`Error creating storybook folder: ${error}`);
                }
            }
        });
    });
    context.subscriptions.push(disposable);
}
// This method is called when your extension is deactivated
function deactivate() { }
//# sourceMappingURL=extension.js.map