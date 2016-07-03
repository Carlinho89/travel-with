'use strict';

var app = require('../..');
import request from 'supertest';

var newJoinRequest;

describe('JoinRequest API:', function() {

  describe('GET /api/join-requests', function() {
    var joinRequests;

    beforeEach(function(done) {
      request(app)
        .get('/api/join-requests')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          joinRequests = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      joinRequests.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/join-requests', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/join-requests')
        .send({
          name: 'New JoinRequest',
          info: 'This is the brand new joinRequest!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newJoinRequest = res.body;
          done();
        });
    });

    it('should respond with the newly created joinRequest', function() {
      newJoinRequest.name.should.equal('New JoinRequest');
      newJoinRequest.info.should.equal('This is the brand new joinRequest!!!');
    });

  });

  describe('GET /api/join-requests/:id', function() {
    var joinRequest;

    beforeEach(function(done) {
      request(app)
        .get('/api/join-requests/' + newJoinRequest._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          joinRequest = res.body;
          done();
        });
    });

    afterEach(function() {
      joinRequest = {};
    });

    it('should respond with the requested joinRequest', function() {
      joinRequest.name.should.equal('New JoinRequest');
      joinRequest.info.should.equal('This is the brand new joinRequest!!!');
    });

  });

  describe('PUT /api/join-requests/:id', function() {
    var updatedJoinRequest;

    beforeEach(function(done) {
      request(app)
        .put('/api/join-requests/' + newJoinRequest._id)
        .send({
          name: 'Updated JoinRequest',
          info: 'This is the updated joinRequest!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedJoinRequest = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedJoinRequest = {};
    });

    it('should respond with the updated joinRequest', function() {
      updatedJoinRequest.name.should.equal('Updated JoinRequest');
      updatedJoinRequest.info.should.equal('This is the updated joinRequest!!!');
    });

  });

  describe('DELETE /api/join-requests/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/join-requests/' + newJoinRequest._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when joinRequest does not exist', function(done) {
      request(app)
        .delete('/api/join-requests/' + newJoinRequest._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
