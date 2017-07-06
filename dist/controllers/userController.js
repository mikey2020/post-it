'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models/models');

var _validations = require('../middlewares/validations');

var _validations2 = _interopRequireDefault(_validations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var validate = new _validations2.default();

var UserActions = function () {
  function UserActions() {
    _classCallCheck(this, UserActions);
  }

  _createClass(UserActions, [{
    key: 'signup',
    value: function signup(req, res) {
      var _validate$signup = validate.signup(req.body),
          errors = _validate$signup.errors,
          isValid = _validate$signup.isValid;

      if (!isValid) {
        res.status(400).json(errors);
      } else {
        // force: true will drop the table if it already exists

        _models.User.sync({ force: false }).then(function () {
          return (
            // Table created
            _models.User.create({
              userName: req.body.username,
              email: req.body.email,
              password: req.body.password
            }).catch(function (err) {
              res.json({ message: 'error saving to database' });
            })
          );
        });

        res.json({ message: req.body.username + ' successfully added' });
      }
    }
  }, {
    key: 'signin',
    value: function signin(req, res) {
      req.session.username = req.body.username;

      _models.User.findAll({
        where: {
          userName: req.body.username
        }
      }).then(function (user) {
        var data = JSON.stringify(user);

        data = JSON.parse(data);

        if (_models.bcrypt.compareSync(req.body.password, data[0].password) === true) {
          req.session.name = req.body.username;
          req.session.userId = data[0].id;

          res.json({ user: { name: req.body.username, message: req.body.username + ' signed in' } });
        } else {
          res.status(404).json({ errors: { form: 'Invalid Signin Parameters' } });
        }
      }).catch(function (err) {
        res.status(404).json({ errors: { form: 'Invalid Signin Parameters' } });
      });
    }
  }, {
    key: 'isUnique',
    value: function isUnique(req, res) {
      _models.User.findOne({

        where: {
          userName: req.params.name
        }

      }).then(function (user) {
        res.json({ user: user });
      });
    }
  }, {
    key: 'allUsers',
    value: function allUsers(req, res) {
      _models.User.findAll({}).then(function (data) {
        res.json({ data: data });
      }).catch(function (err) {
        res.json({ message: 'Error occured please try again' });
      });
    }
  }]);

  return UserActions;
}();

exports.default = UserActions;