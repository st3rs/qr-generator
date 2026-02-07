const compactNumber = (value: number) => {
  if (value >= 1_000_000) return `~${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `~${(value / 1_000).toFixed(1)}k`;
  return `~${Math.round(value)}`;
};

export const maskPhoneOrPromptpay = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '***';
  const last4 = digits.slice(-4);
  const prefix = digits.slice(0, 2) || '08';
  return `${prefix}x-xxx-${last4}`;
};

export const maskWallet = (value: string) => {
  if (!value) return '***';
  const prefix = value.slice(0, 4);
  const suffix = value.slice(-4);
  return `${prefix}...${suffix}`;
};

export const maskApiKey = (value: string) => {
  if (!value) return '***';
  const prefix = value.slice(0, 4);
  const suffix = value.slice(-3);
  return `${prefix}****${suffix}`;
};

export const maskAmountTHB = (value: number) => `฿${compactNumber(value)}`;

export const maskAmountUSDT = (value: number) => `${compactNumber(value)} USDT`;

export const redactPII = (text: string) => {
  return text
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '***')
    .replace(/\+?\d[\d\s-]{7,}/g, '***');
};

export const maskAmountDisplay = (value: string) => {
  if (value.includes('฿')) return '฿***,***';
  if (value.toLowerCase().includes('usdt')) return '~*** USDT';
  return '***';
};
