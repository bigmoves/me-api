import supertest from 'supertest';
import chai from 'chai';
const { expect } = chai;

let request;
let server;

describe('Photos', function() {
  before(function(done) {
    // Start server
    import('../../src/server.mjs').then(module => {
      server = module.default;
      request = supertest.agent(server);
      import('./seed.mjs').then(module => module.default().then(() => done()));
    });
  });

  after(function(done) {
    server.close(() => done());
  });

  it('finds all photos', function(done) {
    request
      .get('/photos')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        console.log();
        if (err) return done(err);
        expect(res.body.length).to.equal(1);
        done();
      });
  });

  it('finds one photo', function(done) {
    request
      .get('/photos/1')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body._id).to.equal('1');
        done();
      });
  });

  it('creates a photo', function(done) {
    request
      .post('/photos')
      .send({
        path: 'http://totallyrad.club/rad.jpg',
        collection: '1'
      })
      .set('Accept', 'application/json')
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.path).to.equal('http://totallyrad.club/rad.jpg');
        done();
      });
  });

  it('updates a photo', function(done) {
    request
      .put('/photos/1')
      .send({
        path: 'http://totallyrad.club/radd.jpg',
        collection: '1'
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body._id).to.equal('1');
        expect(res.body.path).to.equal('http://totallyrad.club/radd.jpg');
        done();
      });
  });

  it('deletes a photo', function(done) {
    request
      .del('/photos/1')
      .set('Accept', 'application/json')
      .expect(204)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
