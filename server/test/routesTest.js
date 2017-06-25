
import should from 'should';

import request from 'supertest';

import {User,Group,Post} from '../models/models.js';

import {app} from '../app.js';


const user = request.agent();

describe('Test api routes', () => {


  describe(' All routes should work' , () => {

  	  it('should return "test-user added successfully" ', (done) => {

  	  

  		request(app).post('/api/user/signup')
            .send({username: "test-user", email: "test-email@yahoo.com",password: "password"})
            .end((err, res) => {
            	console.log(res.body);
                res.status.should.equal(200);
                //should.not.exist(err);
                res.body.should.have.property('message', res.body.message);
              done();
        });

      

  	 });


	  it('should return "dafe is valid"', done => {

	  
	    request(app).post('/api/user/signin')
	        .send({username: "dafe" , password: "dafe"})
	        .end((err, res) => {
	            console.log(res.body);
	            res.status.should.equal(200);
	            should.not.exist(err);
	            //res.body.error.should.be.a.object();
	            res.body.should.have.property('message', res.body.message);
	                
	         done();
	    });

	    

	  });

	  it('should return "test-group  successfully created" ', done => {
	  	
	   request(app).post('/api/group')
	        .send({name: "test-group"})
	        .end((err, res) => {
	            console.log(res.body);
	            res.status.should.equal(200);
	            should.not.exist(err);
	            //res.body.error.should.be.a.object();
	            res.body.should.have.property('message', res.body.message);

	                
	         done();
	    });

	  });

	  it('should return "user added to group" ', done => {
	  	
	   request(app).post('/api/group/1/user')
	        .send({username: "user2"})
	        .end((err, res) => {
	            console.log(res.body);
	            res.status.should.equal(200);
	            should.not.exist(err);
	            //res.body.error.should.be.a.object();
	            res.body.should.have.property('message', res.body.message);

	                
	         done();
	    });

	  });

	  it('should return "message posted to group" ', done => {
	  	
	    request(app).post('/api/group/1/message')
	        .send({message: "how is everybody doing?" })
	        .end((err, res) => {
	            console.log(res.body);
	            res.status.should.equal(200);
	            should.not.exist(err);
	            //res.body.error.should.be.a.object();
	            res.body.should.have.property('message', res.body.message);

	                
	         done();
	    });

	  });

	  it('should return messages posted to group ', done => {
	  	
	    request(app).get('/api/group/1/messages')
	        //.expect(200)
	        .end((err, res) => {
	            console.log(res.body);
	            res.status.should.equal(200);
	            should.not.exist(err);
	            //res.body.error.should.be.a.object();
	            res.body.should.have.property('posts', res.body.posts);

	                
	         done();
	    });

	  });

   });

  after((done) => {
      Group.destroy({
        where: {
          name: "test-group"
        }
      });

      User.destroy({
        where: {
          userName: "test-user"
        }
      });

      Post.destroy({
        where: {
          groupId: 1,
          post: "how is everybody doing?"
        }
      });


    done();

  });


});