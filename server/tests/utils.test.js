import request from 'supertest';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

describe('## Misc', () => {
  describe('# GET /api/service-check', () => {
    it('Should return OK', (done) => {
      request(app)
        .get('/api/service-check')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.text).to.equal('OK');
          done();
        })
        .catch(done);
    });
  });

  describe('# Error Handling', () => {
    it('Should return mongoose CastError', (done) => {
      request(app)
        .get('/api/users/l3k123ljlk123')
        .expect(httpStatus.INTERNAL_SERVER_ERROR)
        .then((res) => {
          expect(res.body.message).to.equal('Internal Server Error');
          done();
        })
        .catch(done);
    });

    it('Should handle express validation error - username is required', (done) => {
      request(app)
        .post('/api/users')
        .send({
          mobileNumber: '1234567890'
        })
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal('"username" is required');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/404', () => {
    it('Should return 404 stats', (done) => {
      request(app)
        .get('/api/404')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });
});
