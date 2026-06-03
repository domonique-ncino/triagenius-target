  try {
    await sendEmail(payload);
  } catch (error) {
    return {
      sent: false,
      messageId: ''
    };
  }