"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultStoryContent = getDefaultStoryContent;
exports.getDefaultStoryContentTS = getDefaultStoryContentTS;
function getDefaultStoryContent(componentImportName, componentFileName, componentTitle, componentExportName, importCss = false, importJs = false) {
    return `import ${componentImportName} from './${componentFileName}.twig';${importCss ? `
import './${componentFileName}.css';` : ''}${importJs ? `
import './${componentFileName}.js';` : ''}
    
  export default {
    title: '${componentTitle}',
    component: ${componentImportName}
  };
  
  export const ${componentExportName} = {
    args: {
      // Add your args here
    }
  };`;
}
function getDefaultStoryContentTS(componentImportName, componentFileName, componentTitle, componentExportName, importCss = false, importJs = false, storybookEngine) {
    return `import type { Meta, StoryObj } from '${storybookEngine}';
import ${componentImportName} from './${componentFileName}.twig';${importCss ? `
import './${componentFileName}.css';` : ''}${importJs ? `
import './${componentFileName}.js';` : ''}

const meta: Meta = {
  title: '${componentTitle}',
  component: ${componentImportName},
}

export default meta;
type Story = StoryObj;
  
export const ${componentExportName}: Story = {
  args: {
    // Add your args here
  }
};`;
}
//# sourceMappingURL=defaultStoryBookContent.js.map