import { toTitleCase, toPascalCase } from "./stringFormatting";
import { writeFile } from "node:fs";
import { resolve } from "node:path";
import { getDefaultStoryContent, getDefaultStoryContentTS } from "./defaultStoryBookContent";

export function storybookFileMaker(filename: string, filepath: string, settings: any) {
  
  const componentImportSuffix = settings?.ComponentImportSuffix || 'Template';
  const componentPascalCase   = toPascalCase(filename);
  const componentImportName   = `${componentPascalCase}${componentImportSuffix}`;
  const componentTitle        = buildComponentTitle(filename, filepath, settings);
  
  const importCss = false;
  const importJs = false;
  

  if ( settings.addStoriesJS ) {
    const jsContent = getDefaultStoryContent(
      componentImportName,
      filename,
      componentTitle,
      componentPascalCase,
      importCss,
      importJs
    );

    writeFile(resolve(filepath, `${filename}.stories.js`), jsContent, {encoding:"utf8"}, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  if ( settings.addStoriesTS ) {
    const storybookEngine = settings.storybookEngine || '@storybook/html-vite';

    const tsContent = getDefaultStoryContentTS(
      componentImportName,
      filename,
      componentTitle,
      componentPascalCase,
      importCss,
      importJs,
      storybookEngine
    );

    writeFile(resolve(filepath, `${filename}.stories.ts`), tsContent, {encoding:"utf8"}, (err) => {
      if (err) {
        throw err;
      }
    });
  }
}


function buildComponentTitle(filename: string, path: string, settings: any) {

  // Base Title
  const titleArray: string[] = [];
  let baseDirectories = [];

  if ( settings?.OrganizeFromParentDirectoryName && settings?.OrganizeFromParentDirectoryName !== '' ) {
    baseDirectories = settings.OrganizeFromParentDirectoryName.split(',').map((dir: string) => dir.trim());
  }
  // Check if any of the base directories exist in the path
  const foundBaseDir: string | undefined = baseDirectories.find((dir: string) => path.includes(dir));

  if ( foundBaseDir !== undefined ) {

    if ( !settings.OmitParentFolderFromTitle ) {
      // Add base directory as first title
      titleArray.push(toTitleCase((foundBaseDir as string).split('/')[0]));
    }

    // Trim path to start after the found base directory
    let trimmedPath = path.split(foundBaseDir)[1];

    if ( trimmedPath ) {
      trimmedPath = removeLastInstance(trimmedPath, filename);
      const pathParts = trimmedPath.split(/[/\\]/).filter(part => part && part !== '');
      for ( const part of pathParts ) {
        titleArray.push(toTitleCase(part));
      }
    }
  }

  // Add component title
  titleArray.push(toTitleCase(filename));

  return titleArray.join('/');



}


function removeLastInstance(input: string, directory: string): string {
  const lastIndex = input.lastIndexOf(directory);
  if (lastIndex === -1) {
    return input;
  }

  return (
    input.slice(0, lastIndex) +
    input.slice(lastIndex + directory.length)
  );
}