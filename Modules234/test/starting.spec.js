var assert = require('assert');
var should = require('chai').should();

describe('Basic Mocha Test', () => {
    it('should deal with object', () => {
        var obj = {name: 'John', gender: 'male'};
        var objB = {name: 'Tim', gender: 'male'};

        obj.should.have.property('name').equal('John');
        //obj.should.deep.equal(objB);
    });
    it('should allow testing null', function () {
        var iAmNull = null;
        // should has a problem, iAmNull is not an object.
        should.not.exist(iAmNull);
    });
});