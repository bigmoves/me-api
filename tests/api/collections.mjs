import supertest from 'supertest';
import chai from 'chai';
const { expect } = chai;

let request;
let server;

describe('Collections', function() {
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

  it('finds all collections', function(done) {
    request
      .get('/collections')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        console.log(res);
        if (err) return done(err);
        expect(res.body.length).to.equal(1);
        done();
      });
  });

  it('finds one collection', function(done) {
    request
      .get('/collections/1')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body._id).to.equal('1');
        done();
      });
  });

  it('creates a collection', function(done) {
    request
      .post('/collections')
      .send({
        name: 'Totally Rad'
      })
      .set('Accept', 'application/json')
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.name).to.equal('Totally Rad');
        done();
      });
  });

  it('updates a collection', function(done) {
    request
      .put('/collections/1')
      .send({
        name: 'Totally Rad Collection'
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body._id).to.equal('1');
        expect(res.body.name).to.equal('Totally Rad Collection');
        done();
      });
  });

  it('deletes a collection', function(done) {
    request
      .del('/collections/1')
      .set('Accept', 'application/json')
      .expect(204)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
