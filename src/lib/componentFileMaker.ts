/** biome-ignore-all assist/source/organizeImports: oi vey */
import * as fs from 'node:fs';
import * as path from 'node:path';

import { toTitleCase } from './stringFormatting';
import { createFile } from './createFile';
import { attributeComponentYml, defaultComponentYml } from './defaultComponentYML';
import { storybookFileMaker } from './storybookFileMaker';
// import { log } from './logger';

// biome-ignore lint/suspicious/noExplicitAny: Type to come
export function componentFileMaker(targetPath: string, dirName: string, settings: any) {

  const componentPath = path.resolve(targetPath, dirName);

  // Create folder path
  if (!fs.existsSync(componentPath)){

    fs.mkdir(componentPath, { recursive: true }, (err) => {

      if (err) {
        throw err;
      }

      // Create component naming schemes
      const componentFileName  = dirName;
      const componentTitleCase = toTitleCase(dirName);

      // Create twig file
      if ( settings?.addTwigFile && settings.addTwigFile ) {
        createFile(componentPath, componentFileName, 'twig');
      }

      // Create html file
      if ( settings?.addHtmlFile && settings.addHtmlFile ) {
        createFile(componentPath, componentFileName, 'html');
      }

      // Create css file
      if ( settings?.addCssFile && settings.addCssFile ) {
        createFile(componentPath, componentFileName, 'css');
      }

      // Create js file
      if ( settings?.addJsFile ) {
        createFile(componentPath, componentFileName, 'js');
      }

      // Create pcss file
      if ( settings?.addPcssFile ) {
        createFile(componentPath, componentFileName, 'pcss');
      }

      // Create sass file
      if ( settings?.addSassFile ) {
        createFile(componentPath, componentFileName, 'sass');
      }

      // Create scss file
      if ( settings?.addScssFile ) {
        createFile(componentPath, componentFileName, 'scss');
      }

      
      if ( settings.addStoriesJS || settings.addStoriesTS ) {
        storybookFileMaker(dirName, componentPath, settings);
      }

    });
  }
  
}