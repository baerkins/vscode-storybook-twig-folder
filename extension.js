const fs = require('fs');
const path = require('path');
const vscode = require('vscode');
const { ucFirst, fileNameToCamelCase, fileNameSpacedToUppercase } = require('./lib/utils');
const { getDefaultStoryContent } = require('./lib/defaultStoryContent');

const defaultjs = `module.exports = {
  context: {

  }
}`;

const defaultjson = `{
  "context": {

  }
}`;

const defaultyml = `context:`;



/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

  let disposable = vscode.commands.registerCommand('createStorybookHtmlFolder', function (uri) {

    const uriPath  = uri.fsPath;
    const isDir    = fs.lstatSync(uriPath).isDirectory();
    const settings = vscode.workspace.getConfiguration('newStorybookHtmlFolder');

    let targetPath;

    if ( !isDir ) {
      targetPath = path.dirname(uriPath);
    } else {
      targetPath = uriPath;
    }

    const options = {
      ignoreFocusOut: true,
      placeHolder: 'Folder_Name',
      validateInput: function(name) {
        if (!name) {
          return 'Name is required';
        }

        if (name.includes(' ')) {
          return 'Spaces are not allowed';
        }

        if (fs.existsSync(path.resolve(targetPath, name))) {
          return 'Name exists';
        }

        // no errors
        return undefined;
      },
      prompt: `Input the storybook folder name`
    };

    // Open Input Box
    vscode.window.showInputBox(options)
      .then((dirName) => {

        if (dirName !== null && dirName !== undefined ) {
          const newPath = path.resolve(targetPath, dirName);


          // // Create folder path
          if (!fs.existsSync(newPath)){

            fs.mkdir(newPath, { recursive: true }, (err) => {

              if (err) throw err;

              const componentRawName     = dirName.slice();
              const componentFileName    = componentRawName;
              const componentCamelCase   = fileNameToCamelCase(componentRawName);
              const componentName        = ucFirst(componentCamelCase, true);
              const componentSuffix      = settings.storybookComponentExportSuffix || 'Default';
              const componentSingleName  = componentSuffix + 'Template';
              const componentSpacedCamel = componentRawName.replace(/-([a-z])/g, function (g) { return ' ' + g[1].toUpperCase(); });
              let   componentTitle       = ucFirst(componentSpacedCamel, true, true);

              if ( settings.useParentDirectoryForStorybookTitles && settings.useParentDirectoryName !== '' ) {
                const parentBase = settings.useParentDirectoryName;

                if (newPath.includes(parentBase)) {
                  const parentBaseTitle = newPath.slice(newPath.indexOf(parentBase) + parentBase.length);
                  const names           = parentBaseTitle.split('/').filter(n => n && n != '');
                  componentTitle        = names.map(n => fileNameSpacedToUppercase(n)).join('/');
                }
              }

              const storyContent = getDefaultStoryContent(componentName, componentFileName, componentTitle, componentSingleName);

              // Create twig file
              fs.writeFile(path.resolve(newPath, `${componentFileName}.twig`), '', function (err) {
                if (err) throw err;
              });

              // Create css file
              if ( settings?.cssFileExtension && settings.cssFileExtension !== '' ) {
                fs.writeFile(path.resolve(newPath, `${componentFileName}.${settings.cssFileExtension}`), '', function (err) {
                  if (err) throw err;
                });
              }

              // Create stories file
              fs.writeFile(path.resolve(newPath, `${componentFileName}.stories.js`), storyContent, {encoding:"utf8"}, function (err) {
                if (err) throw err;
              });

            });
          }

        }
      });

	});

	context.subscriptions.push(disposable);
}

// exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
