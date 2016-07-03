'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var joinRequestCtrlStub = {
  index: 'joinRequestCtrl.index',
  show: 'joinRequestCtrl.show',
  create: 'joinRequestCtrl.create',
  update: 'joinRequestCtrl.update',
  destroy: 'joinRequestCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var joinRequestIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './join-request.controller': joinRequestCtrlStub
});

describe('JoinRequest API Router:', function() {

  it('should return an express router instance', function() {
    joinRequestIndex.should.equal(routerStub);
  });

  describe('GET /api/join-requests', function() {

    it('should route to joinRequest.controller.index', function() {
      routerStub.get
        .withArgs('/', 'joinRequestCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/join-requests/:id', function() {

    it('should route to joinRequest.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'joinRequestCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/join-requests', function() {

    it('should route to joinRequest.controller.create', function() {
      routerStub.post
        .withArgs('/', 'joinRequestCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/join-requests/:id', function() {

    it('should route to joinRequest.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'joinRequestCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/join-requests/:id', function() {

    it('should route to joinRequest.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'joinRequestCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/join-requests/:id', function() {

    it('should route to joinRequest.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'joinRequestCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
