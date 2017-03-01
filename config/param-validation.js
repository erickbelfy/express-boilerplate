import Joi from 'joi';

/**
 * TODO ERICKBELFY doc
 */

const userCreateUpdateStruct = {
  username: Joi.string().required(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
};

export default {

  /**
   * POST /api/users
   **/

  createUser: {
    body: userCreateUpdateStruct
  },


  /**
   * PUT /api/users/:userId
   **/
  updateUser: {
    body: userCreateUpdateStruct,
    params: {
      userId: Joi.string().hex().required()
    }
  },

  /**
   * POST /api/auth/login
   **/
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
