"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultComponentYml = defaultComponentYml;
exports.attributeComponentYml = attributeComponentYml;
function defaultComponentYml(componentTitle, incAttributes = true) {
    return `name: ${componentTitle}
description: 'Description of the component'
props:
  type: object
  properties:`;
}
function attributeComponentYml(componentTitle, incAttributes = true) {
    return `name: ${componentTitle}
description: 
props:
  type: object
  properties:
    attributes:
      type: Drupal\Core\Template\Attribute
      title: Attributes`;
}
//# sourceMappingURL=defaultComponentYML.js.map