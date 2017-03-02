import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/user.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

  /*
   *  TODO ERICKBELFY doc
   **/
  .get(userCtrl.list)

  /*
   *  TODO ERICKBELFY doc
   **/
  .post(validate(paramValidation.createUser), userCtrl.create);

router.route('/:userId')

  /*
   *  TODO ERICKBELFY doc
   **/
  .get(userCtrl.get)


  /*
   *  TODO ERICKBELFY doc
   **/
  .put(validate(paramValidation.updateUser), userCtrl.update)


  /*
   *  TODO ERICKBELFY doc
   **/
  .delete(userCtrl.remove);

/*
 *  TODO ERICKBELFY doc
 **/
router.param('userId', userCtrl.load);

export default router;
