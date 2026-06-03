    logger.error('Operation failed', { error, service: 'digital-experience' });
    throw new ServiceError(
      'Operation failed: ' + error.message,
      { cause: error, retryable: true }
    );