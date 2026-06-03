  timeout: 10000,
      if (attempt < config.retries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }