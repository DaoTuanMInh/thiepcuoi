/**
 * Authentication utilities using Web Crypto API
 * Works across Edge runtime and Node.js runtime without external dependencies.
 */

const SECRET_KEY = process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD || 'thiep-cuoi-wedding-secret-2025';

export async function createSessionToken(username: string): Promise<string> {
  const timestamp = Date.now();
  const rawData = `${username}:${timestamp}`;
  const base64Data = typeof btoa !== 'undefined' 
    ? btoa(rawData) 
    : Buffer.from(rawData).toString('base64');

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(SECRET_KEY),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(base64Data));
  const hexSig = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return `${base64Data}.${hexSig}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token || typeof token !== 'string') return false;

  try {
    const [base64Data, hexSig] = token.split('.');
    if (!base64Data || !hexSig) return false;

    // Decode and check timestamp (valid for 30 days maximum)
    const rawData = typeof atob !== 'undefined'
      ? atob(base64Data)
      : Buffer.from(base64Data, 'base64').toString('utf-8');

    const [username, timestampStr] = rawData.split(':');
    if (!username || !timestampStr) return false;

    const timestamp = parseInt(timestampStr, 10);
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    if (isNaN(timestamp) || Date.now() - timestamp > thirtyDaysMs) {
      return false;
    }

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(SECRET_KEY),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    // Convert hex string to Uint8Array
    const matches = hexSig.match(/.{1,2}/g);
    if (!matches) return false;
    const sigBytes = new Uint8Array(matches.map((b) => parseInt(b, 16)));

    return await crypto.subtle.verify('HMAC', key, sigBytes, encoder.encode(base64Data));
  } catch {
    return false;
  }
}
