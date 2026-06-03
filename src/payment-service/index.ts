import { Request, Response } from 'express';

interface PaymentRequest {
  orderId: string;
  amount: number;
  customer?: {
    accountId: string;
    name: string;
  };
}

export async function processPayment(req: Request, res: Response) {
  const payment: PaymentRequest = req.body;

  // BUG: No null check — crashes when customer is undefined
  const accountId = payment.customer.accountId;

  const result = await chargeAccount(accountId, payment.amount);

  res.json({
    success: true,
    transactionId: result.transactionId,
    orderId: payment.orderId
  });
}

async function chargeAccount(accountId: string, amount: number) {
  // Simulate payment processing
  return {
    transactionId: `txn_${Date.now()}`,
    charged: amount,
    accountId
  };
}

export function refundPayment(req: Request, res: Response) {
  const { transactionId, amount } = req.body;

  // BUG: No validation on amount — could refund negative amounts
  const refundResult = {
    refundId: `ref_${Date.now()}`,
    originalTransaction: transactionId,
    refundedAmount: amount
  };

  res.json(refundResult);
}
