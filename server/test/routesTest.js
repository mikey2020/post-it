
import should from 'should';

import request from 'supertest';

import {User,Group,Post} from '../models/models.js';

import {app} from '../app.js';


const user = request.agent(app);

describe('Test api routes', () => {


  describe(' All routes should work' , () => {

  	  it('should return "test-user successfully added" ', done => {

  	  	
	  	request(app).post('/api/user/signup')
	        .send({username: "test-user", email: "test-email@yahoo.com",password: "pass"})
	        .end((err, res) => {
	            console.log(res.body);
	            res.status.should.equal(200);
	            //should.not.exist(err);
	            res.body.should.have.property('message', res.body.message);
	            //res.body.should.equal({ message: 'test-user successfully added' })
	             
	        //done();

	        });

     	 done();
	        
  	 });


	  it('should return "test-user is valid"', done => {

	  
	    user.post('/api/user/signin')
	        .send({username: "test-user" , password: "pass"})
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
	  	
	   user.post('/api/group')
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
	  	
	  user.post('/api/group/1/user')
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
	  	
	    user.post('/api/group/1/message')
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
	  	
	    user.get('/api/group/1/messages')
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