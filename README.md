# Introduction

[![Travis](https://img.shields.io/travis/i18next/i18next-translation-parser/master.svg?style=flat-square)](https://travis-ci.org/i18next-translation-parser)
[![Coveralls](https://img.shields.io/coveralls/i18next/i18next-translation-parser/master.svg?style=flat-square)](https://coveralls.io/github/i18next/i18next-translation-parser)
[![npm version](https://img.shields.io/npm/v/i18next-translation-parser.svg?style=flat-square)](https://www.npmjs.com/package/i18next-translation-parser)
[![David](https://img.shields.io/david/i18next/i18next-translation-parser.svg?style=flat-square)](https://david-dm.org/i18next/i18next-translation-parser)

This is a module to parse an i18next translation string into an AST and back to a string.

# Getting started

Source can be loaded via [npm](https://www.npmjs.com/package/i18next-translation-parser) or [downloaded](https://github.com/i18next/i18next-chained-backend/blob/master/i18nextTranslationParser.min.js) from this repo.

```
# npm package
$ npm install i18next-translation-parser
```

# Sample

```js
import { parse, stringify } from 'i18next-translation-parser';

const AST = parse('<div>test</div>');
// will return
/*
[
  {
    "type": "tag",
    "name": "div",
    "voidElement": false,
    "attrs": {},
    "children": [
      {
        "type": "text",
        "content": "test"
      }
    ]
  }
]
*/
stringify(AST); // -> '<div>test</div>'

parse('test {{val}} text {{- encoded}} with {{val, format}} some $t{nesting} help');
// will return
/*
[
  {
    "type": "text",
    "content": "test "
  },
  {
    "type": "interpolation",
    "raw": "{{val}}",
    "prefix": "{{",
    "suffix": "}}",
    "content": "val",
    "variable": "val"
  },
  {
    "type": "text",
    "content": " text "
  },
  {
    "type": "interpolation_unescaped",
    "raw": "{{- encoded}}",
    "prefix": "{{-",
    "suffix": "}}",
    "content": " encoded",
    "variable": "encoded"
  },
  {
    "type": "text",
    "content": " with "
  },
  {
    "type": "interpolation",
    "raw": "{{val, format}}",
    "prefix": "{{",
    "suffix": "}}",
    "content": "val, format",
    "variable": "val, format"
  },
  {
    "type": "text",
    "content": " some "
  },
  {
    "type": "nesting",
    "raw": "$t{nesting}",
    "prefix": "$t{",
    "suffix": "}",
    "content": "nesting",
    "variable": "nesting"
  },
  {
    "type": "text",
    "content": " help"
  }
]
*/
```
