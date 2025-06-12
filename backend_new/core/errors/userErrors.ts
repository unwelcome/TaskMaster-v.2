export class UserAlreadyExistsError extends Error {
  constructor(readonly email: string) {
    super(`User with email ${email} already exists`);
    this.name = 'UserAlreadyExistsError';
    Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
  }
}

export class UserNotFoundError extends Error {
  constructor(readonly id: number) {
    super(`User with ID ${id} not found`);
    this.name = 'UserNotFoundError';
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}

export class UserNotFoundByEmailError extends Error {
  constructor(readonly email: string) {
    super(`User with email ${email} not found`);
    this.name = 'UserNotFoundError';
    Object.setPrototypeOf(this, UserNotFoundByEmailError.prototype);
  }
}

export class UserNotChangedError extends Error {
  constructor(readonly id: number) {
    super(`User with ID ${id} not changed`);
    this.name = 'UserNotFoundError';
    Object.setPrototypeOf(this, UserNotChangedError.prototype);
  }
}