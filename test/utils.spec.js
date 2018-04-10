import { astStats, parse } from '../src/';


describe('i18next translation parser', () => {

  describe('astStats', () => {
    var cu;

    before(() => {});

    var tests = [
      {args: ['test'], expected: {interpolation: 0, interpolation_unescaped: 0, nesting: 0, tags: 0}},
      {args: ['<div>test</div>'], expected: {interpolation: 0, interpolation_unescaped: 0, nesting: 0, tags: 1}},
      {args: ['test {{val}} text {{- encoded}} with {{val, format}} some $t{nesting} help'], expected: {interpolation: 2, interpolation_unescaped: 1, nesting: 1, tags: 0}}
    ];

    tests.forEach((test) => {
      it('correctly calcs stats ' + JSON.stringify(test.args) + ' args', () => {
        expect(astStats(parse(test.args[0]))).to.eql(test.expected);
      });
    });
  });
});
