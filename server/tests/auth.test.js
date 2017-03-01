import request from 'supertest';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import chai, { expect } from 'chai';
import app from '../../index';
import { MESSAGES } from '../controllers/auth.controller';
import config from '../../config/config';

chai.config.includeStack = true;

describe('## Authentication', () => {
  const validUserCredentials = {
    username: 'demo',
    password: 'express'
  };

  const invalidUserCredentials = {
    username: 'demo',
    password: 'giraya'
  };

  let jwtToken;

  describe('# POST /api/auth/login', () => {
    it('should return authentication error', (done) => {
      request(app)
        .post('/api/auth/login')
        .send(invalidUserCredentials)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal(MESSAGES.AUTHENTICATION_ERROR);
          done();
        });
    });

    it('should get a valid jwt token', (done) => {
      request(app)
        .post('/api/auth/login')
        .send(validUserCredentials)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.property('token');
          jwt.verify(res.body.token, config.jwtSecret, (err, decoded) => {
            expect(err).to.not.be.ok; // eslint-disable-line no-unused-expressions
            expect(decoded.username).to.equal(validUserCredentials.username);
            jwtToken = `Bearer ${res.body.token}`; // necessary to use on other tests
            done();
          });
        })
        .catch(done);
    });
  });

  describe('# GET /api/auth/random-number', () => {
    it('should fail to get a random number', (done) => {
      request(app)
        .get('/api/auth/random-number')
        .set('Authorization', 'Bearer inValidToken')
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        });
    });

    it('should get a random number', (done) => {
      request(app)
        .get('/api/auth/random-number')
        .set('Authorization', jwtToken)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.num).to.be.a('number');
          done();
        })
        .catch(done);
    });
  });
});
