

const _models = require('../models/models.js');

const _should = require('should');

const _should2 = _interopRequireDefault(_should);

require('../app.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('User Model Unit Tests:', () => {
  before((done) => {
		// User.sync({force: false}).then(() => {

    _models.User.create({ userName: 'testname', email: 'test@gmail.com', password: 'test' });

		// });

    done();
  });

  describe(' Testing creation of user ', () => {
    it('User should be successfully', (done) => {
      _models.User.findOne({ where: { userName: 'testname' } }).then((user) => {
				// console.log(user.get('firstName'));

        _should2.default.exist(user);
      });

      done();
    });
  });

  after((done) => {
    _models.User.destroy({
      where: {
        userName: 'testname'
      }
    });

    done();
  });
});

describe('Group Model Unit Tests:', () => {
  before((done) => {
		// Group.sync({force: false}).then(() => {

    _models.Group.create({ name: 'test-group', creator: 'test-creator' });

    done();

		// });
  });

  describe(' Testing creation of group ', () => {
    it('Group should be successfully created', (done) => {
			// User.create({ userName: "barry", email: "barry@gmail.com",password: "iriswest"});

      _models.Group.findOne({ where: { name: 'test-group' } }).then((group) => {
				// console.log(user.get('firstName'));

        _should2.default.exist(group);
      });

      done();
    });
  });

  after((done) => {
    _models.Group.destroy({
      where: {
        name: 'test-group'
      }
    });

    done();
  });
});

describe('Post Model Unit Tests:', () => {
  before((done) => {
		// Post.sync({force: false}).then(() => {

    _models.Post.create({ post: 'test-post', groupId: 10, groupName: 'test-group' });

    done();

		// });
  });

  describe(' Testing creation of post ', () => {
    it('Post should be successfully created', (done) => {
      _models.Post.findOne({ where: { groupId: 10 } }).then((post) => {
				// console.log(user.get('firstName'));

        _should2.default.exist(post);
      });

      done();
    });
  });

  after((done) => {
    _models.Post.destroy({
      where: {
        post: 'test-post'
      }
    });

    done();
  });
});
