export class NoSecretKeyError extends Error {
  constructor() {
    super(`Cannot find secret key from enviroment`);
    this.name = 'NoSecretKeyError';
    Object.setPrototypeOf(this, NoSecretKeyError.prototype);
  }
}

export class TokenExpiredError extends Error {
  constructor() {
    super(`Token expired`);
    this.name = 'TokenExpiredError';
    Object.setPrototypeOf(this, TokenExpiredError.prototype);
  }
}

export class InvalidTokenError extends Error {
  constructor() {
    super(`Invalid token`);
    this.name = 'InvalidTokenError';
    Object.setPrototypeOf(this, InvalidTokenError.prototype);
  }
}

export class TokenNotFoundError extends Error {
  constructor() {
    super(`Refresh token not found`);
    this.name = 'TokenNotFoundError';
    Object.setPrototypeOf(this, TokenNotFoundError.prototype);
  }
}
