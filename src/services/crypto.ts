import { EncryptedBookingPayload } from '../types';

// Web Crypto API based client-side End-to-End Encryption (AES-256-GCM + PBKDF2)
const APP_SECRET_SALT = new TextEncoder().encode('LuxeDrive-UAE-HighSecurity-Salt-2024');

// Helper to convert ArrayBuffer or Uint8Array to Hex string
function buf2hex(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Helper to convert Hex string back to Uint8Array
function hex2buf(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

// Derive a cryptographic AES-GCM-256 key
async function deriveE2EEKey(passphrase: string = 'LuxeDrive-Vault-Enterprise-Key'): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: APP_SECRET_SALT as unknown as BufferSource,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    {
      name: 'AES-GCM',
      length: 256
    },
    false,
    ['encrypt', 'decrypt']
  );
}

// Compute SHA-256 integrity fingerprint
async function computeSha256Fingerprint(data: string): Promise<string> {
  const enc = new TextEncoder();
  const hashBuf = await window.crypto.subtle.digest('SHA-256', enc.encode(data));
  return buf2hex(hashBuf);
}

// Encrypt booking payload client-side before storage or transmission
export async function encryptBookingData(
  bookingData: {
    carId: string;
    carName: string;
    dealType: 'buy' | 'rent' | 'test-drive';
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    preferredDate: string;
    uaeEmirate: string;
    notes: string;
  }
): Promise<EncryptedBookingPayload> {
  const bookingId = 'LX-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const clientTimestamp = Date.now();
  const rawPayload = JSON.stringify({ ...bookingData, bookingId, clientTimestamp });

  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveE2EEKey();

  const enc = new TextEncoder();
  const encryptedBuf = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv as unknown as BufferSource
    },
    key,
    enc.encode(rawPayload)
  );

  const fingerprint = await computeSha256Fingerprint(rawPayload);

  return {
    bookingId,
    carId: bookingData.carId,
    carName: bookingData.carName,
    dealType: bookingData.dealType,
    customerName: bookingData.customerName, // Keep display reference
    customerPhone: '***-***-' + bookingData.customerPhone.slice(-4), // Masked for display
    customerEmail: bookingData.customerEmail.replace(/(.{2})(.*)(?=@)/, '$1***'), // Masked for display
    preferredDate: bookingData.preferredDate,
    uaeEmirate: bookingData.uaeEmirate,
    notes: bookingData.notes ? '[ENCRYPTED CONTENT]' : '',
    clientTimestamp,
    ciphertextHex: buf2hex(encryptedBuf),
    ivHex: buf2hex(iv),
    saltHex: buf2hex(APP_SECRET_SALT),
    fingerprintSha256: fingerprint,
    encryptionAlgorithm: 'AES-256-GCM (100k PBKDF2 iterations)'
  };
}

// Decrypt booking payload (used by the Manager Operations Dashboard)
export async function decryptBookingData(payload: EncryptedBookingPayload): Promise<any> {
  try {
    const key = await deriveE2EEKey();
    const iv = hex2buf(payload.ivHex);
    const ciphertext = hex2buf(payload.ciphertextHex);

    const decryptedBuf = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv as unknown as BufferSource
      },
      key,
      ciphertext as unknown as BufferSource
    );

    const dec = new TextDecoder();
    return JSON.parse(dec.decode(decryptedBuf));
  } catch (err) {
    console.error('Decryption error:', err);
    throw new Error('Failed to decrypt: MAC authentication tag mismatch or corrupted ciphertext.');
  }
}
