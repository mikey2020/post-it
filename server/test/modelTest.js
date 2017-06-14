import assert from 'assert';
import {User,Group,Post} from '../models/userModel.js';
import should from 'should' ;
import '../app.js';


describe('User Model Unit Tests:', () => { 

	 beforeEach((done) => {    

	 	User.create({ userName: "test-name", email: "test@gmail.com",password: "test"});
      	
      	done();

	 });
 

	describe(' Testing creation of user ',() => {
		
		it('User should be successfully' , () => {

			User.findOne({where: {userName: "test-name"}}).then(user => {
			  //console.log(user.get('firstName'));

			 should.exist(user);

			});

		});
	
	});

	afterEach((done) => {
		User.destroy({
			where: {
				userName: "test-name"
			}
		});

		done();

	});
	
});


describe('Group Model Unit Tests:', () => { 

	 beforeEach((done) => {    

	 	Group.create({ name: "test-group", creator: "test-creator"});
      	
      	done();

	 });
 

	describe(' Testing creation of group ',() => {
		
		it('Group should be successfully created' , () => {

			//User.create({ userName: "barry", email: "barry@gmail.com",password: "iriswest"});

			Group.findOne({where: {name: "test-group"}}).then(group => {
			  //console.log(user.get('firstName'));

			 should.exist(group);

			});

		});
	
	});

	afterEach((done) => {
		Group.destroy({
			where: {
				name: "test-group"
			}
		});

		done();

	});
	
});


describe('Post Model Unit Tests:', () => { 

	 beforeEach((done) => {    

	 	Post.create({ post: "test-post", groupId: 99 , groupName: "test-group"});
      	
      	done();

	 });
 

	describe(' Testing creation of post ',() => {
		
		it('Post should be successfully created' , () => {


			Post.findOne({where: {groupId: 99}}).then(post => {
			  //console.log(user.get('firstName'));

			 should.exist(post);

			});

		});
	
	});

	afterEach((done) => {
		Post.destroy({
			where: {
				groupId: 99
			}
		});

		done();

	});
	
});