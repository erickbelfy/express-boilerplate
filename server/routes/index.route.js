import express from 'express';
import authRoutes from './auth.route';

const router = express.Router();

/**
 * TODO ERICKBELFY doc
 */

router.get('/service-check', (req, res) => {
  res.send('OK');
});

router.use('/auth', authRoutes);

export default router;
