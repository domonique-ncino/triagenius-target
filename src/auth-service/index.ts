import { Request, Response, NextFunction } from 'express';

interface AuthConfig {
  timeout: number;
  retries: number;
  authEndpoint: string;
}

const config: AuthConfig = {
  // BUG: Timeout too low — external auth provider often takes 4-5s
  timeout: 3000,
  retries: 3,
  authEndpoint: 'https://auth.internal.example.com/validate'
};

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= config.retries; attempt++) {
    try {
      const result = await validateToken(token);
      req['user'] = result;
      return next();
    } catch (error) {
      lastError = error;
      console.warn(`Retry attempt ${attempt}/${config.retries} for authentication`);
    }
  }

  res.status(503).json({
    error: 'Authentication service unavailable',
    detail: lastError?.message
  });
}

async function validateToken(token: string): Promise<{ userId: string; roles: string[] }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeout);

  try {
    const response = await fetch(config.authEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`Auth failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(`Connection timed out after ${config.timeout}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
