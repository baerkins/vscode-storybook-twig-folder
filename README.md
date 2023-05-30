# New Storybook Twig Folder

Adds a "Create New Storybook Twig Folder" option to the Explorer context menu. Clicking this option will allow you to enter a name for the folder. The folder will be generated, with matching `.twig`, css, and `.stories.js` named files.

## Configuration

Configure file creation in settings:

<!-- ![configuration options](https://raw.githubusercontent.com/baerkins/vscode-fractal-folder/master/img/options.png "Configuration") -->

**CSS File Extension:** The extension for css. Extension name only without a proceeded `.` *Default: `css`*

**Storybook Component Export Suffix:** Suffix to add to default storybook export name *Default: `Template`*

**Use Parent Directory For Storybook Titles:** Check to allow component titles to reflect their directory structure within a 'parent' directory. Example: if `patterns` is set as `Use Parent Directory Name`, component titles will be altered to match folder structure within `patterns`, so creating a "WideCard" folder in `patterns/components/cards` will result in the storybook title `Patterns/Components/Cards/Wide Card`.

**Use Parent Directory Name:** Name of 'parent' directory to check for in path.


## Usage

Right click a file or folder where you would like to create the storybook twig folder in the explorer.

Select "Create New Storybook Twig Folder", and enter the name in the input box.


## Options

- Customize css extension.
- Allow parent directory structure to create Storybook Title structure
- Customize stories.js export suffix