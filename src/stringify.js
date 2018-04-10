const HTML = require('html-parse-stringify2');


export function stringify(ast) {
  const wrappedAst =[{
    type: 'tag',
    name: 'dummyI18nTag',
    voidElement: false,
    attrs: undefined,
    children: ast
  }];

  const str = HTML.stringify(wrappedAst);
  return str.substring(14, str.length - 15);
}
