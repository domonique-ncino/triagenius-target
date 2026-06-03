  if (!payment.customer || !payment.customer.accountId) {
    res.status(400).json({
      success: false,
      error: 'Missing required customer information: accountId is required'
    });
    return;
  }

  const accountId = payment.customer.accountId;