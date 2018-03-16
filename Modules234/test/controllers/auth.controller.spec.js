var assert = require('assert');
var authController = require('../../controllers/auth.controller');
var expect = require('chai').expect;
var should = require('chai').should();
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var sinon = require('sinon');

chai.use(chaiAsPromised);
chai.should();

describe('AuthController', () => {

    describe('isAuthorized', () => {

        var user = {};
        beforeEach(() => {
            user = {
                roles: ['user'],
                isAuthorized: function (neededRole) {
                    return this.roles.indexOf(neededRole) >= 0;
                }
            };
            sinon.spy(user, 'isAuthorized');
            authController.setUser(user);
        });
        it('Should return false if not authorized', () => {
            var isAuth = authController.isAuthorized('admin');
            user.isAuthorized.calledOnce.should.be.true;
            expect(isAuth).to.be.false;
        });

        it('Should return true if authorized', () => {
            authController.setRoles(['user', 'admin']);
            var isAuth = authController.isAuthorized('user');
            isAuth.should.be.true;
        });
    });
    describe('isAuthorizedAsync', () => {
        it('Should return false if not authorized', function(done) {
            this.timeout(2500);
            authController.setRoles(['user']);
            authController.isAuthorizedAsync('admin', isAuth => {
                assert.equal(false, isAuth);
                done();
            })
        });
    });
    describe('isAuthorizedPromise', function () {
        it('should return false  if not authorized', function () {
            return authController.isAuthorizedPromise('admin').should.eventually.be.false;
        });
    });

    describe.only('getIndex', function () {
        var user = {};
        beforeEach(() => {
            user = {
                roles: ['user'],
                isAuthorized: function (neededRole) {
                    return this.roles.indexOf(neededRole) >= 0;
                }
            };
            authController.setUser(user);
        });
        it('should render index', function () {
            var req = {};
            var res = {
                render: sinon.spy()
            };
            authController.getIndex(req,res);
            res.render.calledOnce.should.be.true;
            res.render.firstCall.args[0].should.equal('index');
        });

        it('should render index if authorized', function () {
            var isAuth = sinon.stub(user, 'isAuthorized').returns(true);
            var req = {user: user};
            var res = {
                render: function () {}
            };
            var mock = sinon.mock(res);
            mock.expects('render').once().withExactArgs('index');

            authController.getIndex(req, res);
            isAuth.calledOnce.should.be.true;

            mock.verify();
        });
    });
});