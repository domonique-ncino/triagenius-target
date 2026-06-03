import express from 'express';
import paymentRouter from './payment-service/router';
import { authenticate } from './auth-service/index';
import { searchInventory, updateStock } from './inventory-service/index';
import { getUserProfile, updatePreferences } from './user-service/index';
import { sendNotification } from './notification-service/index';

const app = express();
app.use(express.json());

// Payment routes
app.use('/api/payments', paymentRouter);

// Protected routes
app.use('/api/inventory', authenticate);
app.get('/api/inventory/search', searchInventory);
app.post('/api/inventory/stock', updateStock);

// User routes
app.get('/api/users/:id', getUserProfile);
app.patch('/api/users/:id/preferences', updatePreferences);

// Notification route
app.post('/api/notify', async (req, res) => {
  const result = await sendNotification(req.body);
  res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
