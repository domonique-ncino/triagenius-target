import { Router } from 'express';
import { processPayment, refundPayment } from './index';

const router = Router();

router.post('/charge', async (req, res) => {
  try {
    await processPayment(req, res);
  } catch (error) {
    // BUG: Leaks internal error details to client
    res.status(500).json({
      error: error.message,
      stack: error.stack
    });
  }
});

router.post('/refund', refundPayment);

export default router;
