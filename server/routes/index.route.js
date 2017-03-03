import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';

const router = express.Router();

/**
 * TODO ERICKBELFY doc
 */

router.get('/service-check', (req, res) => {
  res.send('OK');
});

router.use('/auth', authRoutes);

router.use('/users', userRoutes);

export default router;
