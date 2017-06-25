
import {User,Group,Post} from '../models/models.js';
import should from 'should' ;
import '../app.js';


describe('User Model Unit Tests:', () => { 

	 before((done) => {    

	 	//User.sync({force: false}).then(() => {

	 	   User.create({ userName: "testname", email: "test@gmail.com",password: "test"});

	 	//});
      	
      	done();

	 });
 

	describe(' Testing creation of user ',() => {
		
		it('User should be successfully' , (done) => {

			User.findOne({where: {userName: "testname"}}).then(user => {
			  //console.log(user.get('firstName'));

			 should.exist(user);

			
			});

			 done();

		});
	
	});

	after((done) => {
		User.destroy({
			where: {
				userName: "testname"
			}
		});

		done();

	});
	
});


describe('Group Model Unit Tests:', () => { 

	 before((done) => {   

		//Group.sync({force: false}).then(() => { 

			Group.create({ name: "test-group", creator: "test-creator"});
	      	
	      	done();

		//});

	});


	describe(' Testing creation of group ',() => {
		
		it('Group should be successfully created' , (done) => {

			//User.create({ userName: "barry", email: "barry@gmail.com",password: "iriswest"});

			Group.findOne({where: {name: "test-group"}}).then(group => {
			  //console.log(user.get('firstName'));

			 should.exist(group);

			});

			
			done();

		});
	
	});

	after((done) => {
		Group.destroy({
			where: {
				name: "test-group"
			}
		});

		done();

	});
	
});


describe('Post Model Unit Tests:', () => { 

	 before((done) => {    

	 	//Post.sync({force: false}).then(() => {

	 	 Post.create({ post: "test-post", groupId: 10 , groupName: "test-group"});
      	
      	
      	done();

      	//});

	 });
 

	describe(' Testing creation of post ',() => {
		
		it('Post should be successfully created' , (done) => {


			Post.findOne({where: {groupId: 10}}).then(post => {
			  //console.log(user.get('firstName'));

			 should.exist(post);

		
			 
			});

		    done();

		});
	
	});

	after((done) => {
		Post.destroy({
			where: {
				post: "test-post"
			}
		});

		done();

	});

	
});