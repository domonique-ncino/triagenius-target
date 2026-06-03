import { logger } from './logger';

const BASE_DELAY_MS = 1000;

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
  retries: number = MAX_RETRIES,
  delayMs: number = BASE_DELAY_MS
      logger.warn(`Retry attempt ${attempt}/${retries} failed: ${lastError.message}`);

      if (attempt < retries) {
        const backoffDelay = delayMs * Math.pow(2, attempt - 1);
        await sleep(backoffDelay);
      }
  throw new Error(`All ${retries} retry attempts exhausted. Last error: ${lastError?.message}`);