import app from '../app.js';

import request from 'supertest';

import {User,Group,Post} from '../models/models.js';

import should from 'should' ;

import '../app.js';


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
                res.status.should.equal(200); 
                //should.not.exist(err);
                res.body.should.have.property('message', res.body.message);
              done();
            });
      });
  });


describe('Testing POST routes', () => {
   

    it('it should signup successfully', (done) => {
        request(app)
            .post('/api/user/signup')
            .send({userName: "test-name", email: "test-email@yahoo.com",password: "password"})
            .expect(200)
            .end((err, res) => {
                res.status.should.equal(200);
                //should.not.exist(err);
                res.body.should.have.property('message', res.body.message);
              done();
        });
    });

    describe('All routes should require authentication' , () => {

      it('it should return "please login first" when trying to post message', (done) => {
        request(app)
            .post('/api/group/1/message')
            .send({message: "test-name", groupName: "movies group"})
            .expect(200)
            .end((err, res) => {
                res.status.should.equal(404);
                should.exist(err);
                res.body.should.have.property('error', res.body.error);
              done();
        });

      });

      it('it should return "please login first" when add user to a group', (done) => {
        request(app)
            .post('/api/group/1/user')
            .send({userId: 10, groupId: 10})
            .expect(200)
            .end((err, res) => {
                res.status.should.equal(404);
                should.exist(err);
                //res.body.error.should.be.a.object();
                res.body.should.have.property('error', res.body.error);
              done();
        });

      });

    });


    describe('All routes should work after login' , () => {
      
      beforeEach((done) => {

        it('it should return "dafe is valid"', () => {
          request(app)
              .post('/api/user/signin')
              .send({username: "dafe" , password: "dafe"})
              .expect(200)
              .end((err, res) => {
                console.log(res.body);
                  res.status.should.equal(200);
                  should.not.exist(err);
                  //res.body.error.should.be.a.object();
                  res.body.should.have.property('message', res.body.message);
          });

        });

         done();
      });
      
      describe('Creating groups',() => {

        it('it should "test-group successfully created" ', (done) => {
          request(app)
              .post('/api/group')
              .send({name: "test-group"})
              .expect(200)
              .end((err, res) => {
                console.log(res.body);
                  res.status.should.equal(200);
                  should.not.exist(err);
                  //res.body.error.should.be.a.object();
                  res.body.should.have.property('message', res.body.message);
                done();
          });

        });


      })
      


    });
    

    after((done) => {
      User.destroy({
        where: {
          userName: "test-name"
        }
      });

    done();

  });

});

  