import { parse, stringify } from '../src/';


describe('i18next translation parser', () => {

  describe('basic html parse / stringify', () => {
   var cu;

   before(() => {});

   var tests = [
     {args: ['test'], expected: 'test'},
     {args: ['<div>test</div>'], expected: '<div>test</div>'}
   ];

   tests.forEach((test) => {
     it('correctly parse and stringify back ' + JSON.stringify(test.args) + ' args', () => {
       expect(stringify(parse(test.args[0]))).to.eql(test.expected);
     });
   });
 });

 describe('basic html parse / stringify - with i18next notation', () => {
  var cu;

  before(() => {});

  var tests = [
    {args: ['test {{val}} text {{- encoded}} with {{val, format}} some $t{nesting} help'], expected: 'test {{val}} text {{- encoded}} with {{val, format}} some $t{nesting} help'}
  ];

  tests.forEach((test) => {
    it('correctly parse and stringify back ' + JSON.stringify(test.args) + ' args', () => {
      expect(stringify(parse(test.args[0]))).to.eql(test.expected);
    });
  });
});

});
