export class NoSecretKeyError extends Error {
  constructor() {
    super(`Cannot find secret key from enviroment`);
    this.name = 'NoSecretKeyError';
    Object.setPrototypeOf(this, NoSecretKeyError.prototype);
  }
}