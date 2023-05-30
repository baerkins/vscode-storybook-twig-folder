function getDefaultStoryContent(componentName, componentFileName, componentTitle, componentSingleName) {

return `import ${componentName} from './${componentFileName}.twig';

export default {
  title: '${componentTitle}',
  component: ${componentName}
};

const Template = (args) => ${componentName}(args);

export const ${componentSingleName} = Template.bind({});

${componentSingleName}.args = {

};`

}

module.exports = { getDefaultStoryContent }

