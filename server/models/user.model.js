import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';

import APIError from '../helpers/APIError';

/**
 * TODO ERICKBELFY doc
 */

const UserSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * TODO ERICKBELFY doc
 */
UserSchema.statics = {

  /**
   * TODO ERICKBELFY doc
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('User not found', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * TODO ERICKBELFY doc
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

};

export default mongoose.model('User', UserSchema);
