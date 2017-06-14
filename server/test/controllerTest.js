import app from '../app.js';
import request from 'supertest';

describe('Testing GET routes', () => {

      it('it should GET all users in database', (done) => {
        request(app)
            .get('/api/users')
            .expect(200)
            .end((err, res) => {
                res.body[0].should.have.property('userName', res.body[0].userName);
                res.body[0].should.have.property('password', res.body[0].password);
                res.status.should.equal(200); 
                res.body.should.be.a.Array(); 
              done();
            });
      });

      it('it should GET "login message" when trying access message without logging in', (done) => {
        request(app)
            .get('/api/group/1/messages')
            .expect(200)
            .end((err, res) => {
                console.log(res.body);
                res.status.should.equal(200); 
                //should.not.exist(err);
                res.body.should.have.property('message', res.body.message);
              done();
            });
      });
  });


describe('Testing POST routes', () => {

      
});