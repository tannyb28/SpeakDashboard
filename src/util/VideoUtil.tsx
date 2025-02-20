export async function decryptVideoWithAESGCM(encryptedData: ArrayBuffer, base64Key: string) {
  try {
    // Decode base64 key to ArrayBuffer
    const rawKey = Uint8Array.from(atob(base64Key), (c) => c.charCodeAt(0));

    // Import the key
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      rawKey,
      { name: "AES-GCM" },
      false, // not extractable
      ["decrypt"]
    );

    // Because we used AES.GCM.seal in Swift with no extra data, 
    // we need to parse the 'combined' data for the actual nonce (12 bytes) + ciphertext + tag
    // Swift AES.GCM.SealedBox(combined: data) typically has:
    //   12 bytes nonce,
    //   rest is ciphertext + 16 byte tag
    //
    // But we have to confirm the format you used in Swift. Assuming standard:
    const nonceLength = 12;
    const tagLength = 16;
    if (encryptedData.byteLength < nonceLength + tagLength) {
      throw new Error("Invalid encrypted data length");
    }

    const nonce = encryptedData.slice(0, nonceLength);
    const ciphertextAndTag = encryptedData.slice(nonceLength);

    // Decrypt
    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: nonce,
        // additionalData, etc., if you had them in Swift
      },
      cryptoKey,
      ciphertextAndTag
    );

    return decrypted;
  } catch (err) {
    console.error("Failed to decrypt video", err);
    return null;
  }
}

export async function encryptVideoWithAESGCM(data: ArrayBuffer, base64Key: string) {
  try {
    // Decode base64 key to ArrayBuffer
    const rawKey = Uint8Array.from(atob(base64Key), (c) => c.charCodeAt(0));

    // Import the key
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      rawKey,
      { name: "AES-GCM" },
      false, // not extractable
      ["encrypt"]
    );

    // Generate a random nonce
    const nonce = crypto.getRandomValues(new Uint8Array(12));

    // Encrypt
    const encrypted = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: nonce,
        // additionalData, etc., if you had them in Swift
      },
      cryptoKey,
      data
    );

    // Combine nonce + ciphertext + tag
    const combined = new Uint8Array(nonce.byteLength + encrypted.byteLength);
    combined.set(new Uint8Array(nonce), 0);
    combined.set(new Uint8Array(encrypted), nonce.byteLength);

    return combined;
  } catch (err) {
    console.error("Failed to encrypt video", err);
    return null;
  }
}