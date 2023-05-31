function ucFirst(str, cleanString = false, ccToWords = false) {
  let text = str;

  if ( cleanString ) {
    text = text.replace(/[0-9]/g, '');
    text = text.replace(/^_/g, '');
    text = text.replace(/^-/g, '');
  }

  if ( ccToWords ) {
    text = camelCaseToUcWords(text);
  }

  const toUC = text.charAt(0).toUpperCase() + text.slice(1);

  return toUC.trim();
}

function camelCaseToUcWords(str) {
  const text = str.replace(/([A-Z])/g, (match) => ` ${match}`).replace(/^./, (match) => match.toUpperCase());
  return text.trim();
}


function fileNameToCamelCase(str) {
  let text = str;
  text = text.replace(/^__/g, '_');
  text = text.replace(/^--/g, '-');
  text = text.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
  text = text.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); });
  return text.trim();
}

function fileNameSpacedToUppercase(str) {
  let text = str;
  text = text.replace(/([A-Z])/g, (match) => ` ${match}`).replace(/^./, (match) => match.toUpperCase());
  text = text.replace(/^__/g, '_');
  text = text.replace(/^--/g, '-');
  text = text.replace(/-([a-z])/g, function (g) { return ' ' + g[1].toUpperCase(); });
  text = text.replace(/_([a-z])/g, function (g) { return ' ' + g[1].toUpperCase(); });
  return text.trim();
}





module.exports = {
  ucFirst,
  camelCaseToUcWords,
  fileNameToCamelCase,
  fileNameSpacedToUppercase
}