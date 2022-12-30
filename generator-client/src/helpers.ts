import libsodium from 'libsodium-wrappers';
import { Buffer } from 'buffer';

/**
 * Encrypt a secret with the provided publicKey
 */
export const encryptSecret = async (publicKey: string, secretValue: string) => {
    await libsodium.ready;

    // Convert the message and key to Uint8Array's (Buffer implements that interface)
    const messageBytes = Buffer.from(secretValue);
    const keyBytes = Buffer.from(publicKey, 'base64');

    // Encrypt using LibSodium
    const encryptedBytes = libsodium.crypto_box_seal(messageBytes, keyBytes);

    // Base64 the encrypted secret
    const encrypted = Buffer.from(encryptedBytes).toString('base64');
    return encrypted;
};

/**
 * Returns an object that can be passed to MUI inputProps
 * when the nested input element needs to be given a data-testid=testIdParam
 * property.
 */
export const createTestIdProp = (testId: string) => {
    return { 'data-testid': testId };
};
