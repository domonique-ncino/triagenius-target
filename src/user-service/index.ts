import { Request, Response } from 'express';

interface UserProfile {
  id: string;
  email: string;
  preferences: Record<string, unknown>;
}

export async function getUserProfile(req: Request, res: Response) {
  const userId = req.params.id;

  // Simulate fetching from cache/database
  const raw = await fetchFromCache(userId);

  // BUG: No try/catch around JSON.parse — crashes on malformed cache data
  const profile: UserProfile = JSON.parse(raw);

  res.json(profile);
}

export async function updatePreferences(req: Request, res: Response) {
  const userId = req.params.id;
  const newPrefs = req.body;

  // BUG: No validation of newPrefs shape — could overwrite entire profile
  const raw = await fetchFromCache(userId);
  const profile: UserProfile = JSON.parse(raw);

  profile.preferences = { ...profile.preferences, ...newPrefs };

  await saveToCache(userId, JSON.stringify(profile));
  res.json({ success: true, preferences: profile.preferences });
}

async function fetchFromCache(key: string): Promise<string> {
  // Simulated cache fetch — could return corrupted data
  return '{"id": "' + key + '", "email": "user@example.com", "preferences": {}}';
}

async function saveToCache(key: string, value: string): Promise<void> {
  // Simulated cache write
  console.log(`Cache set: ${key} = ${value.slice(0, 50)}...`);
}
