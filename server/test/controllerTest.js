//import app from '../app.js';

//import request from 'supertest';

//import request from 'superagent';

//const user = request.agent();

//import {User,Group,Post} from '../models/models.js';

//import should from 'should' ;

//import '../app.js';

//describe('Testing api routes', () => {



/*describe('Testing GET routes', () => {

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
            .expect(401)
            .end((err, res) => {
                res.status.should.equal(401);
                //should.exist(err);
                res.body.should.have.property('error', res.body.error);
              done();
        });

      });

      it('it should return "please login first" when add user to a group', (done) => {
        request(app)
            .post('/api/group/1/user')
            .send({userId: 10, groupId: 10})
            .expect(401)
            .end((err, res) => {
                res.status.should.equal(401);
                //should.exist(err);
                //res.body.error.should.be.a.object();
                res.body.should.have.property('error', res.body.error);
              done();
        });

      });

    });*/


      /*beforeEach((done) => {

        //it('it should return "dafe is valid"', (done) => {
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
                  done();

              });//

              /*user
              .post('http://localhost:3000/api/user/signin')
              .send({username: "dafe" , password: "dafe"})
              //.expect(200)
              .end((err, res) => {
                 console.log(res.body);
                  res.status.should.equal(200);
                  should.not.exist(err);
                  //res.body.error.should.be.a.object();
                  res.body.should.have.property('message', res.body.message);

                
                done();
              });

         });

          
     // });



    describe('All routes should work after login' , () => {

      
      
    
         it('it should return "user added successfully" ', (done) => {

               
        
              request(app)
              .post('/api/group')
              .send({name: "test-group"})
              .set('Accept', 'application/json')
              //.expect(200)
              .end((err, res) => {
                console.log(res.body);
                res.status.should.equal(200);
                should.not.exist(err);
                //res.body.error.should.be.a.object();
                res.body.message.should.equal("test-group successfully created");
                res.body.should.have.property('message', res.body.message);

             done();
                
          });

           


        });

       
    });*/
    

    /*after((done) => {
      User.destroy({
        where: {
          userName: "test-name"
        }
      });

    done();

  });

});*/

//})
  