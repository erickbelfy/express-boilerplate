import User from '../models/user.model';


/*
 * TODO ERICKBELFY doc
 **/

function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/*
 * TODO ERICKBELFY doc
 **/
function get(req, res) {
  return res.json(req.user);
}

/*
 * TODO ERICKBELFY doc
 **/
function create(req, res, next) {
  const user = new User({
    username: req.body.username,
    mobileNumber: req.body.mobileNumber
  });

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/*
 * TODO ERICKBELFY doc
 **/
function update(req, res, next) {
  const user = req.user;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;
  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/*
 * TODO ERICKBELFY doc
 **/
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/*
 * TODO ERICKBELFY doc
 **/
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}


export default { load, get, create, update, list, remove };
