(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.i18nextTranslationParser = global.i18nextTranslationParser || {})));
}(this, (function (exports) { 'use strict';

var HTML = require('html-parse-stringify2');

function parse(str) {
  var ast = HTML.parse('<dummyI18nTag>' + str + '</dummyI18nTag>', { ignoreCollapse: true });
  extendI18nextSugar(ast);
  // console.warn(JSON.stringify(ast, null, 2));
  return ast[0].children || [];
}

var REGEXP = new RegExp('(\{\{[^\}]+\}\}|\\$t\\([^\\)]+\\))', 'g');

function extendI18nextSugar(ast) {

  function updateChildren(children) {
    if (!children) return;

    children.forEach(function (child) {
      if (child.type === 'text') {
        if (child.content.indexOf('{{') > -1 || child.content.indexOf('$t(') > -1) {
          var splitted = child.content.split(REGEXP);
          var newChildren = splitted.length > 1 ? child.content.split(REGEXP).reduce(function (mem, match, index) {
            // console.warn(mem, match, index);
            if (index % 2 === 0) {
              mem.push({ type: 'text', content: match });
            } else {
              if (match.indexOf('{{-') === 0) {
                var content = match.substring(3, match.length - 2);
                mem.push({ type: 'interpolation_unescaped', raw: match, prefix: '{{-', suffix: '}}', content: content, variable: content.trim() });
              } else if (match.indexOf('{{') === 0) {
                var _content = match.substring(2, match.length - 2);
                mem.push({ type: 'interpolation', raw: match, prefix: '{{', suffix: '}}', content: _content, variable: _content.trim() });
              } else if (match.indexOf('$t(') === 0) {
                var _content2 = match.substring(3, match.length - 1);
                mem.push({ type: 'nesting', raw: match, prefix: '$t(', suffix: ')', content: _content2, variable: _content2.trim() });
              }
            }
            return mem;
          }, []) : [];
          // console.warn(JSON.stringify(newChildren, null, 2));
          child.children = newChildren;
        }
      }

      if (child.children) updateChildren(child.children);
    });
  }

  updateChildren(ast);

  return ast;
}

var HTML$1 = require('html-parse-stringify2');

function stringify(ast) {
  var wrappedAst = [{
    type: 'tag',
    name: 'dummyI18nTag',
    voidElement: false,
    attrs: undefined,
    children: ast
  }];

  var str = HTML$1.stringify(wrappedAst);
  return str.substring(14, str.length - 15);
}

function astStats(ast) {
  // console.warn(JSON.stringify(ast, null, 2))
  var stats = {
    interpolation: 0,
    interpolation_unescaped: 0,
    nesting: 0,
    tags: 0
  };

  function process(children) {
    if (!children) return;

    children.forEach(function (child) {
      if (child.type === 'tag') stats.tags++;
      if (child.type === 'interpolation_unescaped') stats.interpolation_unescaped++;
      if (child.type === 'interpolation') stats.interpolation++;
      if (child.type === 'nesting') stats.nesting++;

      if (child.children) process(child.children);
    });
  }

  process(ast);
  // console.warn(stats);
  return stats;
}

exports.parse = parse;
exports.stringify = stringify;
exports.astStats = astStats;

Object.defineProperty(exports, '__esModule', { value: true });

})));
