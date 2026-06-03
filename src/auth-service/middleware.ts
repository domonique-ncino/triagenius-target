import { Request, Response, NextFunction } from 'express';

export function rateLimiter(maxRequests: number, windowMs: number) {
  const requests = new Map<string, number[]>();

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || 'unknown';
    const now = Date.now();
    const windowStart = now - windowMs;

    const timestamps = requests.get(ip) || [];
    // BUG: Never cleans up old entries — memory leak over time
    const recent = timestamps.filter((t) => t > windowStart);
    recent.push(now);
    requests.set(ip, recent);

    if (recent.length > maxRequests) {
      return res.status(429).json({ error: 'Too many requests' });
    }

    next();
  };
}
