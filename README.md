# New Storybook HTML Folder

Adds a "Create Storybook HTML Folder" option to the Explorer context menu. Clicking this option will allow you to enter a name for the folder. The folder will be generated, with optional file extensions having matching file names. You can also opt to add css, js, sass, scss, or pcss files, and add them to a subdirectory if desired. 

## Usage

From the sidebar, right click on the location you wish to add a Storybook HTML folder. Click "Create Storybook HTML Folder", and enter the name of the component in the input field. Press enter, and the directory will be created.

You can also access "Create New Storybook HTML Folder" from the Command Palette (⇧⌘P).

Notes: 
- The extension checks for exiting folders with the same name and will replace an existing folder. 
- Spaces are not allowed in the folder name.

## Configuration

Configure file creation in settings:

### Title Creation

Storybook supports organizing components through "categories" which are "created" via the Title (ie "Components/Card" or "Library/Icons/Close"). When `Organize components` option is checked, titles will be generated based on their folder organziation. By default, this starts at root (the name of the `root` folder is not used).

To build titles based on specific parent directories, add a comma seperated list of parent folders that should create their own category groups in the Storybook sidebar to the `Organize From Parent Directory Name` option. When a component folder is created, if it is a child of one of those parent folders, it will generate the title starting with that parent folder. The category name will be the parent folder, unless `Omit Parent Folder From Title` is checked.

#### Examples:

**Assumes:**
- `Organize components` is **checked**
- `Organize From Parent Directory Name` is set to `library,public`

Creating a component folder named 'card' in `[root]/theme/storybook/components` will produce the title `Theme/Storybook/Components/Card`

Creating a component folder named 'card' in `[root]/theme/storybook/library/components` will produce the title `Library/Components/Card`

Creating a component folder named 'card-grid' in `[root]/admin-theme/public/patterns` will produce the title `Public/Patterns/Card Grid`

**If `Omit Parent Folder From Title` is checked:**

Creating a component folder named 'card' in `[root]/theme/storybook/library/components` will produce the title `Components/Card`

Creating a component folder named 'card-grid' in `[root]/admin-theme/public/patterns` will produce the title `Patterns/Card Grid`


### File Options

| Option | Type | Description |
| ------ | ---- | ----------- |
| Add Twig File | Boolean | Check option to add twig file with component name |
| Add Html File | Boolean | Check option to add html file with component name |
| Add css File | Boolean | Check option to add css file with component name |
| Add js File | Boolean | Check option to add js file with component name |
| Add pcss File | Boolean | Check option to add pcss file with component name |
| Add sass File | Boolean | Check option to add sass file with component name |
| Add scss File | Boolean | Check option to add scss file with component name |


### All Storybook Options

| Option | Type | Description |
| ------ | ---- | ----------- |
| Organize components | boolean | Check to automatically include parent folder names in the title of the stories file |
| Organize From Parent Directory Name | Comma seperated list of parent folders that create category groups in the Storybook sidebar. Will autogenerate a title in stories file based on folder organization for folders created within these directory. Example: `library,public` |
| Omit Parent Folder From Title | If checked, the parent folder name from 'Organize From Parent Directory Name' will be omitted from the story title. |
| Add Stories JS | boolean | Check option to add a `.stories.js` file with component name |
| Add Stories TS | boolean | Check option to add a `.stories.ts` file with component name |
| Add Twig File | Adds a `.twig` file |
| Add Html File | Adds a `.html` file |
| Add Css File | Adds a `.css` file |
| Add Js File | Adds a `.js` file |
| Add Pcss File | Adds a `.pcss` file |
| Add Sass File | Adds a `.sass` file |
| Add Scss File | Adds a `.scss` file |
| Component Import Suffix | Suffix value for importing component in stories.js. Default: `Template` |
| Import Engine | string | import name for storybook engine imported to stories.ts files |



















# New Storybook Twig Folder

Adds a "Create New Storybook Twig Folder" option to the Explorer context menu. Clicking this option will allow you to enter a name for the folder. The folder will be generated, with matching `.twig`, css, and `.stories.js` named files.

## Configuration

Configure file creation in settings:

<!-- ![configuration options](https://raw.githubusercontent.com/baerkins/vscode-fractal-folder/master/img/options.png "Configuration") -->

**CSS File Extension:** The extension for css. Extension name only without a proceeded `.` *Default: `css`*

**Storybook Component Import Suffix:** Suffix added to component import name. *Default: `Template`*

**Storybook Component Default Export Name:** Default name for storybook export. Leave empty to use component name, or add a value for the default export name. *Default: ``*

**Use Parent Directory For Storybook Titles:** Check to allow component titles to reflect their directory structure within a 'parent' directory. Example: if `patterns` is set as `Use Parent Directory Name`, component titles will be altered to match folder structure within `patterns`, so creating a "WideCard" folder in `patterns/components/cards` will result in the storybook title `Components/Cards/Wide Card`.

**Use Parent Directory Name:** Name of 'parent' directory to check for in path.


## Usage

Right click a file or folder where you would like to create the storybook twig folder in the explorer.

Select "Create New Storybook Twig Folder", and enter the name in the input box.


## Options

- Customize css extension.
- Allow parent directory structure to create Storybook Title structure
- Customize stories.js export suffix