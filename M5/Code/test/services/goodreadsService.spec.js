var chai = require('chai'),
    sinon = require('sinon'),
    https = require('https');

chai.should();
var grService = require('../../services/goodreadsService');

describe('GoodReadService', function () {
    beforeEach(function () {
        this.request = sinon.stub(https, 'request');
    })
    describe('GetBook', function () {
        it('should return a book', function (done) {
            grService().showBook(2, book => {
               // https.request = {};
                book.title.should.equal('War and Peace');
               done();
            });
        });
    });
});
