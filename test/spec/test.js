function() {
	'use strict';

  describe('tokenize function', function () {
    describe('maybe a bit more context here', function () {
      it('should return an array of separated values', function () {
        expect(tokenize('function(a)')).toEqual(['function','(','a',')']);
      });
    });
  });

  describe('pparse function', function () {
    describe('lets test here', function () {
    it('should return an array nested by scope of functions') {
    	expect(pparse('function(a){return a + 2;};')).toEqual(['function','(','a',')',['return','a','+','2',';'],';']);
    }
  });
  });

}();
