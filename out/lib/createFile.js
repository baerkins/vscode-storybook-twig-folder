"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = createFile;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
function createFile(filePath, name, ext) {
    (0, node_fs_1.writeFile)((0, node_path_1.resolve)(filePath, `${name}.${ext}`), '', (err) => {
        if (err) {
            throw err;
        }
    });
}
//# sourceMappingURL=createFile.js.map