import { pbkdf2Sync, randomBytes } from "node:crypto";

export function hashPassword(password: string, _salt: string | null = null): {salt: string, hash: string} {
  const salt = (_salt === null) ? randomBytes(128).toString('base64') : _salt;
  const iterations = 10;
  const hash = pbkdf2Sync(password, salt, iterations, 128, 'sha512').toString('base64');

  return {salt: salt, hash: hash};
}

export function checkPassword(password: string, passwordHash: string, passwordSalt: string): boolean{
  const {salt, hash} = hashPassword(password, passwordSalt);

  return hash === passwordHash;
}
