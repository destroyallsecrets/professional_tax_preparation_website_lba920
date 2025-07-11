import { generateKeyPair } from 'jose';

async function generateKeys() {
  // Generate RSA key pair with extractable option
  const { privateKey, publicKey } = await generateKeyPair('RS256', {
    modulusLength: 2048,
    extractable: true
  });

  // Export the private key in PKCS#8 format
  const pkcs8 = await crypto.subtle.exportKey('pkcs8', privateKey);
  const pkcs8Pem = `-----BEGIN PRIVATE KEY-----\n${Buffer.from(pkcs8).toString('base64')}\n-----END PRIVATE KEY-----`;

  // Export the public key as JWK
  const jwk = await crypto.subtle.exportKey('jwk', publicKey);

  // Create JWKS
  const jwks = {
    keys: [{
      ...jwk,
      use: 'sig',
      alg: 'RS256'
    }]
  };

  console.log('JWT_PRIVATE_KEY:');
  console.log(pkcs8Pem);
  console.log('\nJWKS:');
  console.log(JSON.stringify(jwks, null, 2));
}

generateKeys().catch(console.error);