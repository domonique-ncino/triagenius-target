    logger.error('Operation failed', { error, service: 'loan-decisioning' });
    throw new ServiceError(
      'Operation failed: ' + error.message,
      { cause: error, retryable: true }
    );