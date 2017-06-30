import { User, bcrypt } from '../models/models';

import Validations from '../middlewares/validations';

const validate = new Validations();

class UserActions {

  signup(req, res) {
    const { errors, isValid } = validate.signup(req.body);


    if (!isValid) {
      res.status(400).json(errors);
    } else {
     // force: true will drop the table if it already exists

      User.sync({ force: false }).then(() =>
       // Table created
      User.create({
        userName: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
       .catch((err) => {
         res.json({ message: 'error saving to database' });
       }));

      res.json({ message: `${req.body.username} successfully added` });
    }
  }

  signin(req, res) {
    req.session.username = req.body.username;

    User.findAll({
      where: {
        userName: req.body.username
      }
    })
     .then((user) => {
       let data = JSON.stringify(user);

       data = JSON.parse(data);


       if (bcrypt.compareSync(req.body.password, data[0].password) === true) {
         req.session.name = req.body.username;
         req.session.userId = data[0].id;

         res.json({ user: { name: req.body.username, message: `${req.body.username} signed in` } });
       } else {
         res.status(401).json({ errors: { form: 'Invalid Signin Parameters' } });
       }
     })

     .catch((err) => {
       res.status(404).json({ errors: { message: 'Invalid login parameters' } });
     });
  }

  isUnique(req, res) {
    User.findOne({

      where: {
        userName: req.params.name
      }

    }).then((user) => {
      res.json({ user });
    });
  }


  allUsers(req, res) {
    User.findAll({}).then((data) => {
      res.json({ data });
    }).catch((err) => {
      res.json({ message: 'Error occured please try again' });
    });
  }


}


export default UserActions;
// export {signup,allUsers,signin,isUnique} ;

