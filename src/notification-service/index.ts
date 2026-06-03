interface EmailPayload {
  to: string;
  subject: string;
  body: string;
  templateId?: string;
}

interface NotificationResult {
  sent: boolean;
  messageId: string;
}

export async function sendNotification(payload: EmailPayload): Promise<NotificationResult> {
  // BUG: No await, no .catch() — unhandled promise rejection if email fails
  sendEmail(payload);

  return {
    sent: true,
    messageId: `msg_${Date.now()}`
  };
}

async function sendEmail(payload: EmailPayload): Promise<void> {
  const response = await fetch('https://email.internal.example.com/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Email delivery failed: ${response.status} ${response.statusText}`);
  }
}

export async function sendBulkNotifications(payloads: EmailPayload[]): Promise<NotificationResult[]> {
  // BUG: No concurrency limit — can overwhelm the email service
  const results = await Promise.all(payloads.map((p) => sendNotification(p)));
  return results;
}
